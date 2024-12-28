import { ApplicationDto } from "@application/types";
import AsyncImage from "@commoncomponents/async/AsyncImage";
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from "@ui/dialog";
import { Fragment } from "react";

interface Props {
  open: boolean;
  onToggle: () => void;
  applicant: ApplicationDto;
}
const ApplicantDetailsDialog = (props: Props) => {
  const { open, onToggle, applicant } = props;

  const jobSeeker = applicant.job_seeker;
  const informations = [
    { label: "Last Education", value: jobSeeker?.last_education },
    { label: "GPA", value: jobSeeker?.gpa || "-" },
    { label: "Major", value: jobSeeker?.major },
    { label: "Wa Number", value: jobSeeker?.user.wa_number },
    { label: "Email", value: jobSeeker?.user.email },
  ];
  const addresses = [
    { label: "Country", value: jobSeeker?.user.country },
    { label: "City", value: jobSeeker?.user.city },
    { label: "Province", value: jobSeeker?.user.province },
    { label: "Address", value: jobSeeker?.user.address },
    { label: "Sub District", value: jobSeeker?.user.subdistrict },
  ];

  const TextWithLabel = (label: string, value?: string) => {
    return (
      <div className="flex flex-col">
        <span className="text-[0.7rem] text-gray-500/90 border-b border-black/90 w-fit">
          {label}
        </span>
        <span className="text-sm">{value || "-"}</span>
      </div>
    );
  };

  return (
    <DialogRoot lazyMount open={open} onOpenChange={onToggle}>
      <DialogContent className="bg-slate-500 text-gray-100">
        <DialogHeader>
          <DialogTitle textAlign="center" fontSize="2xl" fontWeight="bold">
            Applicant Details
          </DialogTitle>
        </DialogHeader>
        <DialogBody className="text-black">
          <div className="flex gap-3 mb-4">
            <AsyncImage
              imgId={jobSeeker?.user.image_url}
              alt={jobSeeker?.user.id}
              width={200}
              height={200}
              imageClassName="w-full h-32 rounded-md object-cover"
            />
            <div className="flex flex-col ps-4 bg-gray-100 rounded-lg shadow-md w-full">
              <span className="text-xl font-semibold mt-2">
                {jobSeeker?.name}
              </span>
              {TextWithLabel("Bio", jobSeeker?.user.bio)}
              {TextWithLabel("Apply Message", applicant.message)}
            </div>
          </div>
          <div className="flex gap-16 px-4 py-2 bg-gray-100 rounded-lg shadow-md">
            <div className="flex flex-col gap-1">
              {informations.map((info, index) => (
                <Fragment key={index}>
                  {TextWithLabel(info.label, info.value as string)}
                </Fragment>
              ))}
            </div>
            <div className="flex flex-col gap-1">
              {addresses.map((info, index) => (
                <Fragment key={index}>
                  {TextWithLabel(info.label, info.value as string)}
                </Fragment>
              ))}
            </div>
          </div>
        </DialogBody>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
};

export default ApplicantDetailsDialog;
