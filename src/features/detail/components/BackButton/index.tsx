import { useRouter } from 'next/navigation';
import { Button } from './styles';

export default function BackButton() {
    const router = useRouter();

    return <Button onClick={() => router.back()}>Back to List</Button>;
}
