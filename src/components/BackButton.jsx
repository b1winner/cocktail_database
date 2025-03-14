'use client';

import {useRouter} from "next/navigation";

const BackButton = () => {
    const router = useRouter();

    return (
        <button onClick={router.back}>Click To Go Back</button>
    );
}

export default BackButton;