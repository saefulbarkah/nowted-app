import Dvider from '@/components/ui/Dvider';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import { useNowtedStore } from '@/store';
import { useActiveNote } from '@/store/useActiveNote';
import { useRecentStore } from '@/store/useRecentStore';
import React, { Dispatch, SetStateAction } from 'react';
import { TnoteProps } from '../NoteMenuList';
import { useRouter } from 'next/navigation';

interface TProps extends TnoteProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

function MoveToTrash({ open, setOpen, data }: TProps) {
  const [loading, setLoading] = React.useState<boolean>(false);
  const removeNote = useNowtedStore((state) => state.removeNote);
  const removeRecents = useRecentStore((state) => state.removeRecents);
  const setActiveNote = useActiveNote((state) => state.setActiveNote);
  const { toast } = useToast();
  const router = useRouter();

  const deletingFolder = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        removeRecents({ id_note: data.id_note });
        removeNote({ folder_id: data.folder_id, id_note: data.id_note });
        resolve(1);
      }, 500);
    });
  };

  const handleRemoveNote = async () => {
    setLoading(true);
    await deletingFolder();
    setLoading(false);
    toast({
      title: 'Succesfully moving note to trash',
      variant: 'success',
    });
    setActiveNote('');
    router.refresh();
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <h2 className="text-xl">Move to trash</h2>
        <Dvider />
        <p>Are you sure you want to move this note to trash ?</p>
        <DialogFooter>
          <Button
            size={'sm'}
            variant={'destructive'}
            onClick={() => handleRemoveNote()}
            isLoading={loading}
          >
            Yes, move it
          </Button>
          <Button
            size={'sm'}
            variant={'secondary'}
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default MoveToTrash;
