import { useFormStatus } from "react-dom"

export default function SubmitReq({ children, className }) {
    const { pending } = useFormStatus()
    return <button className={className} disabled={pending} type="submit">{pending ? 'submitting...' : children}</button>
}