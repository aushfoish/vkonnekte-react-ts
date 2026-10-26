import { Button, ContainerPlaceholder } from "@/shared/ui"
import styles from "./AccountWall.module.scss";


interface WallFetchError {
    refetch: () => void
}

export const WallFetchError = (props: WallFetchError) => {
    const {refetch} = props
    return (
        <div className={styles.wallContent}>
          <ContainerPlaceholder label="Стена не найдена, тут тебе не 2007" />
          <Button className="refetch" children="И всё же.." onClick={refetch} />
        </div>
    )
}