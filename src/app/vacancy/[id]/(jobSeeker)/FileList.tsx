import { DocumentUrlsInputProps, handleDeleteFile } from "@utils/form";
import { useApplicationStore } from "@application/store";
import { UseFormSetValue, UseFormTrigger } from "react-hook-form";
import { CreateApplicationFormDto } from "@application/types/create";

interface FileListProps {
  setValue: UseFormSetValue<CreateApplicationFormDto>;
  trigger: UseFormTrigger<CreateApplicationFormDto>;
}

const FileList = ({ setValue, trigger }: FileListProps) => {
  const { documents, setDocuments, isDocumentUploading, isDocumentDeleting } =
    useApplicationStore();

  return (
    <ul className="mt-2">
      {Array.from(documents || []).map((document, index) => (
        <li key={index} className="flex items-center justify-between">
          <span className="text-gray-200">{document.name}</span>
          <button
            onClick={(event) => {
              handleDeleteFile(
                documents,
                index,
                setDocuments,
                setValue as unknown as UseFormSetValue<DocumentUrlsInputProps>,
                trigger as unknown as UseFormTrigger<DocumentUrlsInputProps>,
                event
              );
            }}
            className="text-red-500 hover:text-red-600"
            disabled={isDocumentUploading || isDocumentDeleting}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default FileList;
