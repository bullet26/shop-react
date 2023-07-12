import { FC, ReactNode } from 'react';
import { Button } from 'antd';

interface ButtonProps {
    labelId: number;
    title?: string | undefined;
    colorText: string;
    backgroundColor: string;
    children: ReactNode;
    buttonOnClickFunc: (id: number) => void;
}

const ButtonF: FC<ButtonProps> = props => {
    const { children, backgroundColor, colorText, buttonOnClickFunc, labelId } = props;

    return (
        <Button style={{ backgroundColor: backgroundColor, color: colorText }} onClick={() => buttonOnClickFunc(labelId)}>
            {children}
        </Button>
    );
};

export default ButtonF;
