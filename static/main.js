const _$ = (...args) => document.querySelector(...args);
const $$ = (...args) => document.querySelectorAll(...args);
const sleep = (ms = 1000) => new Promise(resolve => setTimeout(resolve, ms));

main.innerHTML += docsCode;
const code = _$('code');

for (let line of init) {
	code.appendChild(line);
}

let lines = [...$$('.line:not(.line .line)')];
const docs = _$("#docs");
const docEntries = $$("#docs p");

// classify(el, `+class -otherclass otherclass2`)
const classify = (a,b)=>b.split` `.map(c=>c[0]=='-'?['remove',c.slice(1)]:['add',c[0]=='+'?c.slice(1):c]).map(([d,e])=>a.classList[d](e))

class AsyncQueue {
	constructor() {
		this.functions = [];
		this.executing = false;
	}

	enqueue(fn, execute = true) {
		this.functions.push(fn);
		if (!this.executing && execute) this.execute();
	}

	async execute() {
		this.executing = true;
		if (!this.functions.length) return;

		while (this.functions.length) {
			const fn = this.functions.shift();
			await fn();
		}

		this.executing = false;
	}

	makeFunction(fn) {
		return (...args) => this.enqueue(() => fn(...args));
	}
}

const queue = new AsyncQueue();

let i = 0;
const next = _$('#next');
const previous = _$('#previous');

const nextFn = async () => {
	if (i < steps.length) {
		await steps[i++].forward();
	}
};

const prevFn = async () => {
	if (i > 0) {
		await steps[--i].backward();
	}
}

const focusLine = queue.makeFunction((...lineNrs) => lines.forEach((line, i) => classify(line, lineNrs.includes(i + 1) ? 'focus -dim' : '-focus dim')))
const focusToken = queue.makeFunction((...locs) => locs.forEach(([lineNr, ...tokenNrs]) => lines[lineNr - 1].childNodes.forEach((node, i) => classify(node, tokenNrs.includes(i + 1) ? 'focus -dim' : '-focus dim'))));
const removeLine = queue.makeFunction(async (...lineNrs) => {
	const animations = [];

	await Promise.all(lineNrs.map(async l => {
		const line = lines[l - 1];
		classify(line, 'remove')
		animations.push(
			Promise.all(lines.slice(l).map(async (line) => {
				classify(line, 'remove-next');
				await sleep(500);
			}))
		);
	}))

	await Promise.all(lineNrs.map((l) => {
		const line = lines[l - 1];
		return new Promise((resolve) => {
			sleep(500).then(() => {
				classify(line, '-remove')
				line.remove();
				lines = [...$$('.line:not(.line .line)')];
				resolve();
			});
		});
	}))
});
const saveLine = queue.makeFunction(l => {
	const line = lines[l - 1];
	line.remove();
	lines = [...$$('.line:not(.line .line)')];
	return line;
});
let _pushLine;
const pushLine = queue.makeFunction(_pushLine = async (after, line) => {
	classify(line, 'insert')

	const l = lines[after - 1];
	if (l) {
		l.parentNode.insertBefore(line, l.nextSibling); // ugh
	} else {
		code.appendChild(line);
	}

	$$('data-lsp').forEach(el => {
		if (!el.getAttribute('lsp')) return;
		const node = document.createRange().createContextualFragment(el.getAttribute('lsp'))
		el.appendChild(node.querySelector('code'));
		el.removeAttribute('lsp');
	})

	lines = [...$$('.line:not(.line .line)')];
	await sleep(500);
	classify(line, '-insert')
});
const pushLines = queue.makeFunction(async (after, lines) => {
	const ps = [];
	for (let i = 0; i < lines.length; i++) {
		ps.push(_pushLine((after + i) || 1, lines[i]));
		await sleep(50)
	}

	await Promise.all(ps);
	lines[Math.ceil(lines.length - 1)].scrollIntoView({behavior: 'smooth', block: 'center', inline: 'center'});
});

const imageCache = {};
const pushImage = queue.makeFunction(async src => {
	const image = document.createElement('img');
	image.src = src;
	imageCache[src] = image;

	classify(code, 'fly-up')
	await sleep(1000);

	code.parentNode.insertBefore(image, code);
	classify(code, 'hidden -fly-up')
});
const removeImage = queue.makeFunction(async src => {
	classify(imageCache[src], 'pull-out')
	await sleep(1000);

	imageCache[src].remove();
	classify(code, 'pull-up')
	await sleep(1000);

	classify(code, '-hidden -pull-up')
});

const defocus = queue.makeFunction(() => $$('.dim, .focus').forEach(el => classify(el, '-dim -focus')));

function saveLines(...lineNrs) {
	const ls = [];
	for (const l of lineNrs) {
		const line = lines[l - 1];
		line.remove();
		ls.push(line);
	}
	lines = [...$$('.line:not(.line .line)')];
	return ls;
}

const observer = new IntersectionObserver(callback, {root: docs, threshold: 0.1});

let first_load = true;
let lastIntersecting = 1;
function callback(entries) {
	if (first_load) return first_load = false;
	entries.forEach(entry => {
		const { target, isIntersecting } = entry;
		const id = +target.id.slice(1);

		if (!isIntersecting) return;
		if (id > lastIntersecting) nextFn();
		else if (id < lastIntersecting) prevFn();

		lastIntersecting = id;
	});
}

docEntries.forEach(p => observer.observe(p));
