import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { div } from 'motion/react-client';

export default function ErrorPage() {
    return (
        <div className="flex items-center justify-center align-middle h-screen">
            <DotLottieReact
                src="/Error 404.lottie"
                autoplay
                loop
                style={{ width: 300, height: 300 }}
            />
        </div>
    );
}