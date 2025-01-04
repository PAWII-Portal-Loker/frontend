"use client";

import type { ButtonProps, RecipeProps } from "@chakra-ui/react";
import {
  Button,
  FileUpload as ChakraFileUpload,
  Icon,
  IconButton,
  Span,
  Text,
  useRecipe,
} from "@chakra-ui/react";
import * as React from "react";
import { LuUpload, LuX } from "react-icons/lu";
import { motion } from "framer-motion";
import { scaleVariants } from "@consts/animationVariants";
import { UseFormSetValue, UseFormTrigger } from "react-hook-form";
import { CreateApplicationFormDto } from "@application/types/create";
import { useApplicationStore } from "@application/store";
import { DocumentUrlsInputProps, handleDeleteFile } from "@utils/form";
import { useState, useEffect } from "react";
import Image from "next/image";
import {
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
} from "./popover";
import { FaRegFilePdf } from "react-icons/fa6";
import {
  CONTAINER_ACTIVE_CLASSES,
  getThemeClassNames,
  TEXT_CLASSES,
} from "@utils/classNames";
import { useScreenSize } from "@utils/screenSize";
import clsx from "clsx";
export interface FileUploadRootProps extends ChakraFileUpload.RootProps {
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}

export const FileUploadRoot = React.forwardRef<
  HTMLInputElement,
  FileUploadRootProps
>(function FileUploadRoot(props, ref) {
  const { children, inputProps, ...rest } = props;
  return (
    <ChakraFileUpload.Root {...rest}>
      <ChakraFileUpload.HiddenInput ref={ref} {...inputProps} />
      {children}
    </ChakraFileUpload.Root>
  );
});

export interface FileUploadDropzoneProps
  extends ChakraFileUpload.DropzoneProps {
  label: React.ReactNode;
  description?: React.ReactNode;
}

export const FileUploadDropzone = React.forwardRef<
  HTMLInputElement,
  FileUploadDropzoneProps
>(function FileUploadDropzone(props, ref) {
  const { children, label, description, ...rest } = props;
  return (
    <ChakraFileUpload.Dropzone ref={ref} {...rest}>
      <Icon fontSize="xl" color="fg.muted">
        <LuUpload />
      </Icon>
      <ChakraFileUpload.DropzoneContent>
        <Text className={getThemeClassNames(TEXT_CLASSES)}>{label}</Text>
        {description && <Text color="fg.warning">{description}</Text>}
      </ChakraFileUpload.DropzoneContent>
      {children}
    </ChakraFileUpload.Dropzone>
  );
});

interface VisibilityProps {
  showSize?: boolean;
  clearable?: boolean;
}

interface FileUploadItemProps extends VisibilityProps {
  file: File;
  setValue: UseFormSetValue<CreateApplicationFormDto>;
  trigger: UseFormTrigger<CreateApplicationFormDto>;
  index: number;
}

const FileUploadItem = React.forwardRef<HTMLLIElement, FileUploadItemProps>(
  function FileUploadItem(props, ref) {
    const { file, showSize, clearable, setValue, trigger, index } = props;
    const { setDocuments } = useApplicationStore();
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const { isMd } = useScreenSize();
    const [isOpen, setOpen] = useState<boolean>(false);

    useEffect(() => {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewUrl(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    }, [file]);

    return (
      <PopoverRoot
        positioning={{ placement: isMd ? "left" : "top" }}
        onOpenChange={(e) => setOpen(e.open)}
      >
        <PopoverTrigger asChild>
          <motion.div
            variants={scaleVariants}
            animate="animate"
            exit="exit"
            initial="initial"
            transition={{ delay: index * 0.1 }}
          >
            <ChakraFileUpload.Item
              file={file}
              ref={ref}
              className={clsx(
                isOpen && "font-bold",
                getThemeClassNames(CONTAINER_ACTIVE_CLASSES)
              )}
            >
              <ChakraFileUpload.ItemPreview asChild>
                {file.type.startsWith("image/") ? (
                  <Image
                    src={previewUrl ?? "/no-image.jpg"}
                    alt={file.name}
                    width={30}
                    height={30}
                  />
                ) : (
                  <Icon fontSize="lg" color="fg.error" width={30} height={30}>
                    <FaRegFilePdf />
                  </Icon>
                )}
              </ChakraFileUpload.ItemPreview>

              {showSize ? (
                <ChakraFileUpload.ItemContent>
                  <ChakraFileUpload.ItemName />
                  <ChakraFileUpload.ItemSizeText />
                </ChakraFileUpload.ItemContent>
              ) : (
                <ChakraFileUpload.ItemName flex="1" />
              )}

              {clearable && (
                <ChakraFileUpload.ItemDeleteTrigger asChild>
                  <IconButton
                    variant="solid"
                    bg="red.100"
                    marginY="auto"
                    color="red.500"
                    colorScheme="red"
                    size="sm"
                    aria-label="Remove file"
                    _hover={{
                      bg: "red.200",
                      color: "red.600",
                      scale: "1.1",
                      transition: "all 0.2s",
                    }}
                    onClick={(event) =>
                      handleDeleteFile(
                        index,
                        setDocuments,
                        setValue as unknown as UseFormSetValue<DocumentUrlsInputProps>,
                        trigger as unknown as UseFormTrigger<DocumentUrlsInputProps>,
                        event
                      )
                    }
                  >
                    <LuX />
                  </IconButton>
                </ChakraFileUpload.ItemDeleteTrigger>
              )}
            </ChakraFileUpload.Item>
          </motion.div>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverBody
            className={clsx(
              "rounded-md",
              getThemeClassNames(CONTAINER_ACTIVE_CLASSES)
            )}
            padding={file.type === "application/pdf" ? 0 : 1}
          >
            {file.type.startsWith("image/") ? (
              <Image
                src={previewUrl ?? "/no-image.jpg"}
                alt={file.name}
                width={400}
                height={400}
                className="rounded-md"
              />
            ) : (
              <iframe
                src={URL.createObjectURL(file)}
                className="rounded-lg shadow-md"
                width="100%"
                height="400"
              />
            )}
          </PopoverBody>
        </PopoverContent>
      </PopoverRoot>
    );
  }
);

interface FileUploadListProps
  extends VisibilityProps,
    ChakraFileUpload.ItemGroupProps {
  files?: File[];
  setValue: UseFormSetValue<CreateApplicationFormDto>;
  trigger: UseFormTrigger<CreateApplicationFormDto>;
}

export const FileUploadList = React.forwardRef<
  HTMLUListElement,
  FileUploadListProps
>(function FileUploadList(props, ref) {
  const { showSize, clearable, setValue, trigger, ...rest } = props;
  const { documents } = useApplicationStore();
  if (documents.length === 0) return null;

  return (
    <ChakraFileUpload.ItemGroup ref={ref} {...rest}>
      {documents.map((file, index) => (
        <FileUploadItem
          key={`${file.lastModified}-${file.name}-${index}`}
          file={file}
          showSize={showSize}
          clearable={clearable}
          setValue={setValue}
          trigger={trigger}
          index={index}
        />
      ))}
    </ChakraFileUpload.ItemGroup>
  );
});

type Assign<T, U> = Omit<T, keyof U> & U;

interface FileInputProps extends Assign<ButtonProps, RecipeProps<"input">> {
  placeholder?: React.ReactNode;
}

export const FileInput = React.forwardRef<HTMLButtonElement, FileInputProps>(
  function FileInput(props, ref) {
    const inputRecipe = useRecipe({ key: "input" });
    const [recipeProps, restProps] = inputRecipe.splitVariantProps(props);
    const { placeholder = "Select file(s)", ...rest } = restProps;
    return (
      <ChakraFileUpload.Trigger asChild>
        <Button
          unstyled
          py="0"
          ref={ref}
          {...rest}
          css={[inputRecipe(recipeProps), props.css]}
        >
          <ChakraFileUpload.Context>
            {({ acceptedFiles }) => {
              if (acceptedFiles.length === 1) {
                return <span>{acceptedFiles[0].name}</span>;
              }
              if (acceptedFiles.length > 1) {
                return <span>{acceptedFiles.length} files</span>;
              }
              return <Span color="fg.subtle">{placeholder}</Span>;
            }}
          </ChakraFileUpload.Context>
        </Button>
      </ChakraFileUpload.Trigger>
    );
  }
);

export const FileUploadLabel = ChakraFileUpload.Label;
export const FileUploadClearTrigger = ChakraFileUpload.ClearTrigger;
export const FileUploadTrigger = ChakraFileUpload.Trigger;
