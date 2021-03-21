import { FC, useState } from "react";
import Cropper from "react-easy-crop";
import { Area } from "react-easy-crop/types";
import { Box, Button } from "theme-ui";

import { getCroppedImageUrl } from "../utils/image";
import {
  ModalCard,
  ModalClose,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalPortal,
} from "./Modal";

type Props = {
  imageUrl: string;
  onClose: () => void;
  onSave: (url: string) => void;
};

export const CropperModal: FC<Props> = ({
  imageUrl,
  onClose,
  onSave,
}: Props) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>();

  const handleCropComplete = (_croppedArea: Area, croppedAreaPixels: Area) =>
    setCroppedAreaPixels(croppedAreaPixels);

  const handleSaveCrop = async () => {
    if (!croppedAreaPixels) {
      return;
    }
    const url = await getCroppedImageUrl(imageUrl, croppedAreaPixels);
    onSave(url);
    onClose();
  };

  return (
    <ModalPortal onClose={onClose}>
      <ModalCard>
        <ModalClose onClose={onClose} />
        <ModalHeader>Crop your photo</ModalHeader>

        <ModalContent>
          <Box sx={{ position: "relative", minHeight: 350 }}>
            <Cropper
              aspect={1}
              image={imageUrl}
              crop={crop}
              onCropChange={setCrop}
              onCropComplete={handleCropComplete}
              zoom={zoom}
              onZoomChange={setZoom}
            />
          </Box>
        </ModalContent>

        <ModalFooter>
          <Button variant="tertiary" onClick={onClose} mr={2}>
            Cancel
          </Button>

          <Button variant="secondary" onClick={handleSaveCrop}>
            Save
          </Button>
        </ModalFooter>
      </ModalCard>
    </ModalPortal>
  );
};
