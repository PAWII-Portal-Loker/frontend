import { DocumentUrlsInputProps, handleDeleteFile } from "@utils/form";
import { useApplicationStore } from "@application/store";
import { UseFormSetValue, UseFormTrigger } from "react-hook-form";
import { CreateApplicationFormDto } from "@application/types/create";
import { motion } from "framer-motion";
import { scaleVariants } from "@consts/animationVariants";

interface FileListProps {
  setValue: UseFormSetValue<CreateApplicationFormDto>;
  trigger: UseFormTrigger<CreateApplicationFormDto>;
}

const FileList = ({ setValue, trigger }: FileListProps) => {
  const { documents, setDocuments, isDocumentUploading, isDocumentDeleting } =
    useApplicationStore();

  return (
    <ul className="mt-2 space-y-2">
      {Array.from(documents || []).map((document, index) => (
        <motion.li
          variants={scaleVariants}
          animate="animate"
          exit="exit"
          initial="initial"
          transition={{ delay: index * 0.1 }}
          key={index}
          className="flex items-center justify-between rounded-lg px-4 py-2 bg-gray-200"
        >
          <span className="text-gray-800 font-medium truncate">
            {document.name}
          </span>
          <button
            onClick={(event) =>
              handleDeleteFile(
                documents,
                index,
                setDocuments,
                setValue as unknown as UseFormSetValue<DocumentUrlsInputProps>,
                trigger as unknown as UseFormTrigger<DocumentUrlsInputProps>,
                event
              )
            }
            className="text-red-500 hover:text-red-600 font-medium"
            disabled={isDocumentUploading || isDocumentDeleting}
          >
            Delete
          </button>
        </motion.li>
      ))}
    </ul>
  );
};

export default FileList;
