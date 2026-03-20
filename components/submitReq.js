import { useFormStatus } from "react-dom"

export default function SubmitReq({ children }) {
    const { pending } = useFormStatus()
    return <button disabled={pending} type="submit">{pending ? 'submitting...' : children}</button>
}