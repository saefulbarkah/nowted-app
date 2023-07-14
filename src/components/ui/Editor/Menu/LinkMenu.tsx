'use client';
import React, { useEffect, useRef, useState } from 'react';
import { PropsEditor } from '../EditorToolbar';
import { Popover, PopoverContent, PopoverTrigger } from '../../popover';
import { Button } from '../../button';
import { FiLink } from 'react-icons/fi';
import { Input } from '../../input';
import { Label } from '../../label';
import { useToast } from '../../use-toast';

function LinkMenu({ editor }: PropsEditor) {
  const { toast } = useToast();
  const [url, seturl] = useState<string>('');
  const [name, setName] = useState<string>('');
  const inputRefUrl = useRef<HTMLInputElement | null>(null);
  const [isNotUrl, setIsNotUrl] = useState<boolean>(false);
  if (!editor) return;
  const isUrl = editor.isActive('link');

  const handleChangeWithValidation = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    seturl(e.target.value);
    try {
      const newUrl = new URL(url);
      setIsNotUrl(false);
      return newUrl;
    } catch (error) {
      return setIsNotUrl(true);
    }
  };
  const handleAddURL = () => {
    try {
      const newUrl = new URL(url);
      editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: `${newUrl}` })
        .run();
    } catch (error) {
      toast({
        title: 'Error',
        variant: 'danger',
        description: 'invalid URL, url must start with https:// or http://',
      });
      setIsNotUrl(true);
    }
  };

  return (
    <>
      {isUrl && (
        <Button
          variant={'secondary'}
          size={'sm'}
          onClick={() => editor.commands.unsetLink()}
        >
          <FiLink className="text-[20px]" />
        </Button>
      )}
      {!isUrl && (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant={'ghost'} className="p-[7px]" size={'sm'}>
              <FiLink className="text-[20px] text-white/[60%]" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="bg-background outline-none border border-white/[20%] w-[300px] text-white">
            <div className="grid gap-2 mt-4">
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="url">URL :</Label>
                <div className="relative w-full col-span-2">
                  <Input
                    id="url"
                    placeholder="http://example.com"
                    autoFocus={false}
                    className={`col-span-2 h-8 focus-visible:ring-0 border-white/[30%] autofill:bg-background focus-visible:bg-background`}
                    onChange={(e) => handleChangeWithValidation(e)}
                    ref={inputRefUrl}
                  />
                  <div
                    className={`absolute top-0 -translate-y-6 transition-opacity opacity-0 pointer-events-none ${
                      isNotUrl ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    {isNotUrl && (
                      <p className="text-[14px] text-red-500">Invalid URL</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <Button
              className="w-full mt-5 capitalize"
              variant={'default'}
              size={'sm'}
              onClick={() => handleAddURL()}
            >
              save
            </Button>
          </PopoverContent>
        </Popover>
      )}
    </>
  );
}

export default LinkMenu;
