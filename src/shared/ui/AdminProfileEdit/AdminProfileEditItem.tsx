import styles from './AdminProfileEditItem.module.scss'

interface AdminProfileEdit {
    id: string
    rows: number
    name: string
    value: string | undefined
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
    placeholder: string
    label: string
    maxSigns?: number
}

export const AdminProfileEditItem = (props: AdminProfileEdit) => {

    const {id, rows = 1, name, value, onChange, placeholder, label, maxSigns} = props


    return (
        <li className={styles.editItem}>
            <label htmlFor={id}>{label}</label>
            <textarea value={value} onChange={(e) => onChange(e)} id={id} rows={rows} name={name} autoComplete='none' placeholder={placeholder} maxLength={maxSigns}></textarea>
        </li>
    )
}