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
      className="bg-white rounded-lg shadow-md border border-gray-200/60 flex items-center justify-between"
      variants={slideVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ delay: delay }}
    >
      <div className="flex px-3 py-2 items-center gap-3">
        <div className="rounded-full">
          <AsyncImage
            imgId={jobSeeker?.user.image_url}
            alt={jobSeeker?.user.id}
            width={200}
            height={200}
            imageClassName="rounded-full w-10 h-10 object-cover"
          />
        </div>
        <span className="font-semibold truncate">{jobSeeker?.name}</span>
      </div>
      <div className="me-2 w-[5.1rem]">
        <Tooltip content="User Detail" openDelay={500} closeDelay={50}>
          <Button
            onClick={onOpen}
            className="hover:bg-blue-400/30 rounded-full"
          >
            <BiSolidUserDetail className="w-6 h-6" />
          </Button>
        </Tooltip>
        <Tooltip
          content="Download User Attachment"
          openDelay={500}
          closeDelay={50}
        >
          <Button
            onClick={() => handleClickDownload(applicant.document_urls)}
            className="hover:bg-blue-400/30 rounded-full"
          >
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
    </motion.div>
  );
};

export default ApplicantCard;
