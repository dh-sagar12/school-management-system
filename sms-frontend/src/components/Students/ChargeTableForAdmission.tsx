import React, { useContext, useEffect, useRef, useState } from 'react';
import type { InputRef } from 'antd';
import { Button, Form, Input, InputNumber, Popconfirm, Table, message } from 'antd';
import type { FormInstance } from 'antd/es/form';

const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface Item {
    key: string;
    name: string;
    age: string;
    address: string;
}

interface EditableRowProps {
    index: number;
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr {...props} />
            </EditableContext.Provider>
        </Form>
    );
};

interface EditableCellProps {
    title: React.ReactNode;
    editable: boolean;
    children: React.ReactNode;
    dataIndex: keyof Item;
    record: Item;
    handleSave: (record: Item) => void;
}

const EditableCell: React.FC<EditableCellProps> = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
}) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const form = useContext(EditableContext)!;

    useEffect(() => {
        if (editing) {
            inputRef.current!.focus();
        }
    }, [editing]);

    const toggleEdit = () => {
        setEditing(!editing);
        form.setFieldsValue({ [dataIndex]: record[dataIndex] });
    };

    const save = async () => {
        try {
            const values = await form.validateFields();

            toggleEdit();
            handleSave({ ...record, ...values });
        } catch (errInfo) {
        }
    };

    let childNode = children;

    if (editable) {
        childNode = editing ? (
            <Form.Item
                style={{ margin: 0 }}
                name={dataIndex}
                rules={[
                    {
                        required: true,
                        message: `${title} is required.`,
                    },
                ]}
            >
                <InputNumber ref={inputRef} onPressEnter={save} onBlur={save} />
            </Form.Item>
        ) : (
            <div className="editable-cell-value-wrap" style={{ paddingRight: 24 }} onClick={toggleEdit}>
                {children}
            </div>
        );
    }

    return <td {...restProps}>{childNode}</td>;
};

type EditableTableProps = Parameters<typeof Table>[0];

interface DataType {
    key: React.Key;
    charge_name: string;
    charge_amount: number;
    received_amount: number;

}

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;


interface Charges {
    key?: number,
    charge_id: number,
    charge_name: string,
    due_charge: number,
    course_id: number
    academic_session_type: number,
    discount: number,
    received_amount: number,

}


interface Props {
    ChargesData: Charges[];
    setChargesData: any
    selectedRow: Charges[]
    setSelectedRow: any



}

const ChargeTableForAdmission = (prop: Props) => {


    // const [selectedRow, setSelectedRow] = useState<Charges[]>([]);

    const defaultColumns: (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[] = [
        {
            title: 'Charge',
            dataIndex: 'charge_name',
        },
        {
            title: 'Charge',
            dataIndex: 'due_charge',
        },
        {
            title: 'Received Charge',
            dataIndex: 'received_amount',
            editable: true,
        },
        {
            title: 'Discount',
            dataIndex: 'discount',
            editable: true,
        },

    ];


    const handleSave = (row: Charges) => {

        if (row.due_charge < row.received_amount || row.due_charge < row.discount) {
            message.warning('invalid Data')
        }
        else {
            const newData = [...prop.ChargesData];
            const index = newData.findIndex((item) => row.key === item.key);
            const item = newData[index];
            newData.splice(index, 1, {
                ...item,
                ...row,
            });
            prop.setChargesData(newData);

            if (prop.selectedRow.some(item => item.charge_id == row.charge_id)) {
                let updated_selected_row =  prop.selectedRow.map(item=> {
                    if (item.charge_id  == row.charge_id){
                        return row
                    }
                    return item
                })
                // setSelectedRow(selectedRow.filter(item=> item.charge_id !== row.charge_id))
                prop.setSelectedRow(updated_selected_row)
            }



        }

    };

    const components = {
        body: {
            row: EditableRow,
            cell: EditableCell,
        },
    };

    const columns = defaultColumns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record: DataType) => ({
                record,
                editable: col.editable,
                dataIndex: col.dataIndex,
                title: col.title,
                handleSave,
            }),
        };
    });

    const onSelectChange = (newSelectedRowKeys: React.Key[], record: any) => {
        prop.setSelectedRow(record);
    };

    const rowSelection = {
        setSelectedRow: prop.setSelectedRow, 
        onChange: onSelectChange,
    };



    return (
        <div>
            <Table
                rowSelection={rowSelection}
                components={components}
                rowClassName={() => 'editable-row'}
                bordered
                dataSource={prop.ChargesData}
                columns={columns as ColumnTypes}
            />
        </div>
    );
};

export default ChargeTableForAdmission;