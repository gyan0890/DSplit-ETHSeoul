import React, { useState } from 'react';

import { Button } from '@/components';

interface AddNoteProps {
  onSetNote: (note: string) => void;
}

const AddNote = ({ onSetNote }: AddNoteProps) => {
  const [note, setNote] = useState('');

  return (
    <div className="flex flex-col w-full justify-center items-center">
      <h1 className="text-2xl text-center">Add a note</h1>

      <form className="mt-8">
        <input
          className="mt-4 w-64 h-14 bg-white border-2 border-black rounded-md p-2 block w-full p-4 pl-10 text-center"
          autoFocus
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </form>
      <div className="mt-4 text-center">
        <Button label="continue" onClick={() => onSetNote(note)} />
      </div>
    </div>
  );
};

export default AddNote;
