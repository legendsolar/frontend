import classNames from 'classnames';
import React from 'react';
import styles from './Header.module.css';
import {Button} from "@mui/material";

export type HeaderProps = {
  text: string,
};

export function Header({  text }: HeaderProps) {
  return (
    <div>
        <header className={classNames([styles.header])}>

      {text}
    </header>
    </div>
  );
}

export function TestButton({text} : HeaderProps) {
    return <Button>{text }</Button>
}