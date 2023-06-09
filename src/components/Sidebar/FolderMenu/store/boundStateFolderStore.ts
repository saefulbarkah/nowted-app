import { create } from "zustand";
import {
  createNameStore,
  createFolderStore,
  updateFolderStore,
  editFolderStore,
} from "./folderState";
import {
  NameType,
  createFolderType,
  editFolderType,
  updateFolderType,
} from "./folderStateType";

type boundSliceName = NameType &
  createFolderType &
  editFolderType &
  updateFolderType;

export const useBoundStore = create<boundSliceName>((...a) => ({
  ...createNameStore(...a),
  ...createFolderStore(...a),
  ...editFolderStore(...a),
  ...updateFolderStore(...a),
}));
