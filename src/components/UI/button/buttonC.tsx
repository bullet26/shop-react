import { Component, ReactNode } from 'react';
import { Button } from 'antd';

interface ButtonProps {
    labelId: number;
    title?: string | undefined;
    colorText: string;
    backgroundColor: string;
    children: ReactNode;
    showModal: (id: number) => void;
}

class ButtonC extends Component<ButtonProps> {
    render(): ReactNode {
        const { children, backgroundColor, colorText, showModal, labelId } = this.props;

        return (
            <Button style={{ backgroundColor: backgroundColor, color: colorText }} onClick={() => showModal(labelId)}>
                {children}
            </Button>
        );
    }
}

export default ButtonC;
