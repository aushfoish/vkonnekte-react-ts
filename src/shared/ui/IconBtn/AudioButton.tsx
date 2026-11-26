import type React from "react"
import type { ButtonHTMLAttributes } from "react"

interface AudioButton extends ButtonHTMLAttributes<HTMLButtonElement>{
    children: React.ReactNode
    id: string
    onClick?: () => void
    ariaLabel: string
    title?: string
    className: string
}

export const AudioButton = (props:AudioButton) => {

    const {
        className,
        title,
        children,
        id,
        onClick,
        ariaLabel
    } = props

    return (
        <button className={className} id={id} onClick={onClick} type='button' aria-label={ariaLabel} title={title}>
                      {children}
        </button> 
    )
}

export default AudioButton