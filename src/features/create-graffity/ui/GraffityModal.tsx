import { CanvasBrushSettings } from "@/features/create-graffity/ui/CanvasBrushSettings";
import { CanvasItselfContainer } from "@/features/create-graffity/ui/CanvasItselfContainer";
import { CanvasOptionsBlock } from "@/features/create-graffity/ui/CanvasOptionsBlock";
import { useCanvasDrawing } from "@/shared/lib/hooks/useCanvasDrawing";
import { Button, ModalFooter } from "@/shared/ui";
import { useState } from "react";
import styles from "./GraffityUI.module.scss";
import { useSendGraffity } from "@/entities/posts/model/useSendGraffity";

interface GraffityModalProps {
  onCloseModal: (value: boolean) => void;
}

export const GraffityModal = (props: GraffityModalProps) => {
  const { onCloseModal } = props;

  const [strokeStyle, setStrokeStyle] = useState("#3498db");
  const [lineWidth, setLinewidth] = useState(50);
  const [globalAlpha, setGlobalAlpha] = useState(0.7);

  const { mutate: sendGraffity, isPending } = useSendGraffity();

  const { canvasRef, ctxClear } = useCanvasDrawing({
    strokeStyle,
    lineWidth,
    globalAlpha,
  });

  const ctxSave = () => {
    const canvas = canvasRef.current;
    if (canvas === null) return;
    const ctx = canvas.getContext("2d");
    if (ctx === null) return;

    canvas.toBlob(
      (readyBlob) => {
        if (!readyBlob) return;

        sendGraffity(readyBlob, {
          onSuccess: () => {
            ctxClear();
            onCloseModal(false)
          },
          onError: () => {
            alert("ошибка при отправке граффити")
          }
        });
      },
      "image/png",
      1.0,
    );
  };

  return (
    <>
      <div className={styles.canvasUI}>
        <CanvasOptionsBlock onClick={ctxClear} />

        <CanvasItselfContainer canvasRef={canvasRef} width={600} height={300} />

        <CanvasBrushSettings
          strokeStyle={strokeStyle}
          setStrokeStyle={setStrokeStyle}
          lineWidth={lineWidth}
          setLinewidth={setLinewidth}
          globalAlpha={globalAlpha}
          setGlobalAlpha={setGlobalAlpha}
        />

        <ModalFooter
          footer={
            <Button
              isLoading={isPending}
              className="post"
              children="Отправить"
              onClick={() => {
                ctxSave();
              }}
            />
          }
        />
      </div>
    </>
  );
};
