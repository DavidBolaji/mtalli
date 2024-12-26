import React, { useRef, ChangeEvent, useState } from "react";
import { Formik, Form } from "formik";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/button/button";
import { useNotification } from "@/hooks/use-notification";

export const isAllowedFileType = (fileType: string) =>
  ["image/jpeg", "image/png"].includes(fileType);

type UploadImageFormProps<T> = {
  btnRef?: React.RefObject<HTMLButtonElement>;
  urls?: string[];
  count?: number;
  keyz: string;
  // type: keyzof T; // Dynamic keyz based on the provided type
};

export const UploadImageForm = <T extends Record<string, any>>({
  btnRef,
  urls,
  count = 5,
  keyz,
  // type,
}: UploadImageFormProps<T>) => {
  const ref = useRef<HTMLInputElement | null>(null);
  const queryClient = useQueryClient();
  const { toggleNotification } = useNotification();
  const [loading, setLoading] = useState<boolean>(false);

  const open = () => ref.current?.click();

  const handleChange = async (
    e: ChangeEvent<HTMLInputElement>,
    values: { urls: string[] },
    setFieldValue: (field: string, value: string[]) => void
  ) => {
    const files = e.target.files;
    if (!files) return;

    if (values.urls.length + files.length > count) {
      toggleNotification({
        show: true,
        title: `You can only upload up to ${count} images`,
        type: "error",
        message: `Image upload cannot be more than ${count}`,
      });
      return;
    }

    setLoading(true);

    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        if (!isAllowedFileType(file.type)) {
          toggleNotification({
            show: true,
            title: "Invalid file type",
            type: "error",
            message: "Image upload must be of type PNG or JPEG.",
          });
          return "";
        }

        const isLt5M = file.size / 1024 / 1024 < 5;
        if (!isLt5M) {
          toggleNotification({
            show: true,
            title: "File too large",
            type: "error",
            message: "Image files must be less than 5MB",
          });
          return "";
        }

        const formData = new FormData();
        formData.append("file", file);
        formData.append(
          "upload_preset",
          process.env.NEXT_PUBLIC_CLOUDINARY_PRESET || ""
        );

        const response = await fetch(
          `https://api.cloudinary.com/v1_1/dhwlkhbet/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await response.json();
        return data.secure_url;
      });

      const newUrls = await Promise.all(uploadPromises);
      const filteredUrls = newUrls.filter(Boolean);

      setFieldValue("urls", [...values.urls, ...filteredUrls]);
      queryClient.setQueryData([`${keyz}`], (old: T) =>
        old
          ? {
              ...old,
              images: [...values.urls, ...filteredUrls],
            }
          : {
              images: [...values.urls, ...filteredUrls],
            }
      );
    } catch (error) {
      toggleNotification({
        show: true,
        title: "Error uploading image(s)",
        type: "error",
        message: `${(error as Error).message}`,
      });
    } finally {
      setLoading(false);
      if (ref.current) {
        ref.current.value = "";
      }
    }
  };

  const removeImage = (
    index: number,
    values: { urls: string[] },
    setFieldValue: (field: string, value: unknown) => void
  ) => {
    const newUrls = values.urls.filter((_, idx) => idx !== index);
    setFieldValue("urls", newUrls);
    queryClient.setQueryData([`${keyz}`], (old: T) => ({
      ...old,
      images: newUrls,
    }));
  };

  return (
    <Formik
      initialValues={{ urls: urls ?? [] }}
      onSubmit={() => {}}
      enableReinitialize
    >
      {({ values, setFieldValue, resetForm }) => (
        <Form>
          <div className="min-h-[200px]">
            <div className="space-y-4">
              {values.urls.length === 0 && !loading ? (
                <div className="flex flex-col p-8 items-center border-2 border-dashed bg-black-500 rounded-lg justify-center gap-y-2">
                  <p className="text-sm">Upload Images</p>
                  <p className="text-xs text-muted-foreground">
                    PNG, JPEG not more than 5MB in size.
                  </p>
                </div>
              ) : loading ? (
                <div className="grid grid-cols-5">
                  {/* Add loading UI */}
                </div>
              ) : (
                <div className="grid grid-cols-5">
                  {values.urls.map((url: string, idx: number) => (
                    <div key={idx} className="relative aspect-square w-16 h-16 flex items-center justify-center">
                      <Image
                        src={url}
                        alt={`Upload ${idx + 1}`}
                        className="rounded-lg object-cover p-2"
                        width={64}
                        height={64}
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(idx, values, setFieldValue)}
                        className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 text-destructive-foreground rounded-full p-1"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <input
              type="file"
              className="hidden"
              multiple
              accept="image/png,image/jpeg"
              ref={ref}
              onChange={(e) => handleChange(e, values, setFieldValue)}
            />
            <div className="mt-4 flex flex-col items-center gap-2 pb-2">
              <Button color="light" size="lg" className="font-orent font-bold text-sm bg-black-400"  onClick={open} disabled={values.urls.length >= count}>
                Upload Images
              </Button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};
