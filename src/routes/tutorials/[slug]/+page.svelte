<script>
  export let data;
  let { URL } = data;

  fetch(URL)
    .then((res) => res.text())
    .then((code) => {
      const scriptEl = document.querySelector("#the-script");
      const scriptEl2 = document.querySelector("#the-script-two");
      scriptEl.appendChild(document.createTextNode(code));
      scriptEl2.src = "/main.js";
    });
</script>

<svelte:head>
  <script id="the-script"></script>
  <script id="the-script-two"></script>
  <link rel="stylesheet" href="/style.css" />
</svelte:head>
<div id="main">
  <div class="code-container"><code></code></div>
</div>
