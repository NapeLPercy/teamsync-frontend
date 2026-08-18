import { addproject } from "../services/projectApi";
import { useMutation } from "@tanstack/react-query";

export function useAddProject() {
  return useMutation({
    mutationFn: addproject,
  });
}
