"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import FileUploadService from "@fileUpload/service";
import { isValidImageUrl } from "@utils/validImageUrl";
import { Skeleton } from "@chakra-ui/react";
import clsx from "clsx";

interface AsyncImageProps {
  imgId?: string;
  alt?: string;
  width: number;
  height: number;
  className?: string;
  imageClassName?: string;
}

const AsyncImage = (props: AsyncImageProps) => {
  const {
    imgId,
    alt = "myImage",
    width,
    height,
    className,
    imageClassName,
  } = props;
  const [imageUrl, setImageUrl] = useState<string>("/no-image.jpg");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    if (!imgId) {
      if (isMounted) {
        setImageUrl("/no-image.jpg");
        setIsLoading(false);
      }
      return;
    }

    const fileService = new FileUploadService();
    const isValid = isValidImageUrl(imgId);

    if (isValid) {
      if (isMounted) {
        setImageUrl(imgId);
        setIsLoading(false);
      }
    } else {
      fileService.getFile(imgId, {
        onSuccess: (data) => {
          if (isMounted) setImageUrl(data.url);
        },
        onError: () => {
          if (isMounted) setImageUrl("/no-image.jpg");
        },
        onFullfilled: () => {
          setIsLoading(false);
        },
      });
    }

    return () => {
      isMounted = false;
    };
  }, [imgId]);

  return (
    <div className={`relative ${className}`}>
      {isLoading ? (
        <Skeleton width="100%" height="25rem" />
      ) : (
        <Image
          src={imageUrl}
          alt={alt}
          width={width}
          height={height}
          className={clsx(
            "w-full transition-transform duration-200 transform hover:scale-105",
            isLoading ? "opacity-0" : "opacity-100",
            imageClassName
          )}
          priority
          onLoad={() => setIsLoading(false)}
          onError={() => setImageUrl("/no-image.jpg")}
        />
      )}
    </div>
  );
};

export default AsyncImage;
