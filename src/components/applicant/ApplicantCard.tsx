import { ApplicationDto } from "@application/types";
import { motion } from "framer-motion";
import { slideVariants } from "@consts/animationVariants";
import AsyncImage from "@commoncomponents/async/AsyncImage";
import { BiSolidUserDetail } from "react-icons/bi";
import { Tooltip } from "@ui/tooltip";
import { Button } from "@ui/button";
import { IoDocumentAttachOutline } from "react-icons/io5";
import { useDisclosure } from "@chakra-ui/react";
import ApplicantDetailsDialog from "./ApplicantDetailsDialog";

interface Props {
  applicant?: ApplicationDto;
  delay?: number;
}
const ApplicantCard = (props: Props) => {
  const { applicant, delay = 0 } = props;
  const { onOpen, onToggle, open } = useDisclosure();

  if (!applicant) return null;

  const jobSeeker = applicant.job_seeker;

  const handleClickDownload = (urls: string[]) => {
    // eslint-disable-next-line no-console
    console.log("(Not Implemented Yet!) Downloading: ", urls);
  };

  return (
    <motion.div
      className="bg-white rounded-lg shadow-md border border-gray-200/60"
      variants={slideVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ delay: delay }}
    >
      <div className="flex border-b px-3 py-2 items-center gap-3">
        <div className="rounded-full">
          <AsyncImage
            imgId={jobSeeker?.user.image_url}
            alt={jobSeeker?.user.id}
            width={200}
            height={200}
            imageClassName="rounded-full w-12 h-12 object-cover"
          />
        </div>
        <span className="font-semibold">{jobSeeker?.name}</span>
      </div>
      <div className="ps-3">
        <Tooltip content="User Detail" openDelay={300}>
          <Button onClick={onOpen}>
            <BiSolidUserDetail className="w-6 h-6" />
          </Button>
        </Tooltip>
        <Tooltip content="Download User Attachment" openDelay={300}>
          <Button onClick={() => handleClickDownload(applicant.document_urls)}>
            <IoDocumentAttachOutline className="w-5 h-5" />
          </Button>
        </Tooltip>
      </div>
      {open ? (
        <ApplicantDetailsDialog
          open={open}
          onToggle={onToggle}
          applicant={applicant}
        />
      ) : null}
      {/* <div className="flex flex-col gap-1 ps-4">
        {informations.map((info, index) => (
          <div className="flex flex-col" key={index}>
            <span className="text-xs text-gray-500/90">{info.label}</span>
            <span className="text-sm -mt-0.5">{info.value || "-"}</span>
          </div>
        ))}
      </div> */}
    </motion.div>
  );
};

export default ApplicantCard;
