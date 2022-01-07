import React from 'react';
import { Button } from '../Style';

type PaginationButtonProps = {
    move: React.MouseEventHandler<HTMLButtonElement>,
    text: string
}

export const PaginationButton = ({move, text}: PaginationButtonProps) => {
    return (
      <Button margin='10px' width='15%' 
        type="button"
        onClick={move}
      >
        {text}
      </Button>
    )
}
