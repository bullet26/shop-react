import { Component, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { ButtonC } from '../UI/button/';
import { ModalC, ModalContentC } from '../UI/modal/';
import { Space } from 'antd';
import { ArrowUpOutlined } from '@ant-design/icons';

interface HW1State {
    isOpenModal1: boolean;
    isOpenModal2: boolean;
}

class HomeWork1 extends Component {
    state: HW1State = {
        isOpenModal1: false,
        isOpenModal2: false,
    };

    showModal = (id: number): void => {
        if (id === 1) {
            this.setState({
                isOpenModal1: true,
            });
        } else if (id === 2) {
            this.setState({
                isOpenModal2: true,
            });
        }
    };

    handleOk = (): void => {
        this.setState({
            isOpenModal1: false,
            isOpenModal2: false,
        });
    };

    handleCancel = (): void => {
        this.setState({
            isOpenModal1: false,
            isOpenModal2: false,
        });
    };

    render(): ReactNode {
        return (
            <>
                <Space direction='vertical' size='middle' style={{ display: 'flex' }}>
                    <h1>HomeWork1</h1>
                    <Space size='middle' style={{ display: 'flex' }}>
                        <ButtonC backgroundColor='darkblue' colorText='yellow' labelId={1} showModal={this.showModal}>
                            <ArrowUpOutlined />
                            <span>Open first modal</span>
                        </ButtonC>
                        <ButtonC backgroundColor='yellow' colorText='darkblue' labelId={2} showModal={this.showModal}>
                            <ArrowUpOutlined />
                            <span>Open second modal</span>
                        </ButtonC>
                    </Space>
                    <ModalC header='Modal_1' isOpen={this.state.isOpenModal1} closeButton={true} handleOk={this.handleOk} handleCancel={this.handleCancel}>
                        <ModalContentC>Once you delete this file, it won’t be possible to undo this action. Are you sure you want to delete it?</ModalContentC>
                    </ModalC>
                    <ModalC header='Modal_2' isOpen={this.state.isOpenModal2} closeButton={false} handleOk={this.handleOk} handleCancel={this.handleCancel} cancelText={'Skip'} okText={'Buy'}>
                        <ModalContentC>
                            <div> Data disk type: MongoDB</div> <div>Database version: 3.4</div>
                            <div>Package: dds.mongo.mid</div> <div>Storage space: 10 GB</div>
                            <div>Replication factor: 3</div> <div>Region: East China 1</div>
                        </ModalContentC>
                    </ModalC>

                    <Link to='/'>
                        <Button type='link'>Go To Home</Button>
                    </Link>
                </Space>
            </>
        );
    }
}

export default HomeWork1;
