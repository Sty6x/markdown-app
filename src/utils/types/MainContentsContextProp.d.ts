import { SetStateAction } from "react";

export interface IMainContentsContextType {
  notes: INote[];
  setNotes: (prev: Array<INote>) => void;
  noteIDRef: { current: undefined | string };
  writeNote: () => Promise<void>;
  noteModalActive: boolean;
  isSaving: boolean;
  setEditorActive: Dispatch<SetStateAction<boolean>>;
  editorActive: boolean;
}
