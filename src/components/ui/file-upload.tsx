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
import { LuFile, LuUpload, LuX } from "react-icons/lu";
import { motion } from "framer-motion";
import { scaleVariants } from "@consts/animationVariants";
import { UseFormSetValue, UseFormTrigger } from "react-hook-form";
import { CreateApplicationFormDto } from "@application/types/create";
import { useApplicationStore } from "@application/store";
import { DocumentUrlsInputProps, handleDeleteFile } from "@utils/form";

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
        <Text color="fg.muted">{label}</Text>
        {description && <Text color="fg.muted">{description}</Text>}
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
    return (
      <motion.div
        variants={scaleVariants}
        animate="animate"
        exit="exit"
        initial="initial"
        transition={{ delay: index * 0.1 }}
      >
        <ChakraFileUpload.Item file={file} ref={ref}>
          <ChakraFileUpload.ItemPreview asChild>
            <Icon fontSize="lg" color="fg.muted">
              <LuFile />
            </Icon>
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
                color="red.500"
                colorScheme="red"
                size="sm"
                aria-label="Remove file"
                _hover={{
                  bg: "red.200",
                  color: "red.600",
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
          key={`${file.name}-${index}`}
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
