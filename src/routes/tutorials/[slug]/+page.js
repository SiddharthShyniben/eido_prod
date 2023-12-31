import {redirect} from '@sveltejs/kit';
import {storage} from '../../../firebase';
import {getDownloadURL, ref} from 'firebase/storage';
import {user} from "../../../stores";

export async function load({ params }) {
    const currUser = await new Promise(resolve => {
        user.subscribe(u => resolve(u))
    })

    if (!currUser) throw redirect(302, '/home');

    const tutRef = ref(storage, `out/${params.slug}.js`);
    const URL = await getDownloadURL(tutRef);
    return {URL};
}
