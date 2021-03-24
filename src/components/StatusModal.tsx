import "emoji-mart/css/emoji-mart.css";

import { BaseEmoji, Picker } from "emoji-mart";
import { FC, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Box, Button, Field, Text, useColorMode } from "theme-ui";

import {
  StatusSetMutationVariables,
  useStatusClearMutation,
  useStatusSetMutation,
} from "../graphql/types";
import { useUser } from "../hooks/use-user";
import { FadeIn } from "./Animated";
import {
  ModalCard,
  ModalClose,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalPortal,
} from "./Modal";

type Props = {
  onClose: () => void;
};

type FormData = StatusSetMutationVariables;

export const StatusModal: FC<Props> = ({ onClose }: Props) => {
  const { user } = useUser();
  const [colorMode] = useColorMode();
  const defaultEmoji = user?.status?.emoji || "💬";
  const [, clearStatus] = useStatusClearMutation();
  const [setStatusResult, setStatus] = useStatusSetMutation();
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);
  const { control, handleSubmit, register, getValues } = useForm<FormData>({
    defaultValues: {
      emoji: defaultEmoji,
      message: user?.status?.message,
    },
  });

  const handleClearStatus = async () => {
    onClose();
    await clearStatus();
  };

  const handleSaveStatus = handleSubmit(async (data) => {
    const result = await setStatus(data);
    if (!result.error) {
      onClose();
    }
  });

  const getEmojiPickerColorMode = (colorMode: string): "light" | "dark" =>
    colorMode === "light" ? "light" : "dark";

  return (
    <ModalPortal onClose={onClose} hasDimmedBackground>
      <ModalCard>
        <ModalClose onClose={onClose} />
        <ModalHeader>Set a status</ModalHeader>

        <ModalContent>
          <Box
            as="form"
            id="status-form"
            onSubmit={handleSaveStatus}
            sx={{ px: 3 }}
          >
            <Field
              label={`What's happening ${user?.username || ""}?`}
              type="text"
              {...register("message", { required: true })}
              spellCheck
              pl={4}
            />

            <Button
              variant="unstyled"
              type="button"
              onClick={() => setEmojiPickerOpen(true)}
              sx={{ position: "absolute", p: 2, top: 86 }}
            >
              {getValues("emoji")}
            </Button>

            <Controller
              name="emoji"
              control={control}
              render={({ field }) =>
                emojiPickerOpen ? (
                  <ModalPortal onClose={() => setEmojiPickerOpen(false)}>
                    <Picker
                      title="Pick an emoji"
                      emoji="point_up"
                      native
                      theme={getEmojiPickerColorMode(colorMode)}
                      onSelect={(emoji: BaseEmoji) => {
                        field.onChange(emoji.native);
                        setEmojiPickerOpen(false);
                      }}
                    />
                  </ModalPortal>
                ) : (
                  <></>
                )
              }
            />

            <Box>
              {setStatusResult.error && (
                <FadeIn>
                  <Text variant="danger">
                    {setStatusResult.error.graphQLErrors[0]?.message ||
                      setStatusResult.error.networkError?.message}
                  </Text>
                </FadeIn>
              )}
            </Box>
          </Box>
        </ModalContent>

        <ModalFooter>
          <Button variant="tertiary" mr={2} onClick={handleClearStatus}>
            Clear status
          </Button>

          <Button variant="secondary" type="submit" form="status-form">
            Save status
          </Button>
        </ModalFooter>
      </ModalCard>
    </ModalPortal>
  );
};
