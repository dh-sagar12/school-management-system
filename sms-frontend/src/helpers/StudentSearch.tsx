import { AddNewStudentForm } from '@/students/studentTypes'
import APIHandlers from '@/utils/APIHandlers'
import { Select } from 'antd'
import React, { Dispatch, useState } from 'react'
import { AiOutlineLoading } from 'react-icons/ai'
import type { SelectProps } from 'antd';



interface Props {
    allowClear?: boolean,
    placeholder?: string | 'Search Student',
    style?: object,
    value: string,
    setValue: React.Dispatch<React.SetStateAction<string>>,
    notFoundContent?: React.ReactNode,
    className?: string,
}


let timeout: ReturnType<typeof setTimeout> | null;
let currentValue: string;



const fetch = (value: string, callback: Function) => {

    if (timeout) {
        clearTimeout(timeout);
        timeout = null;
    }
    currentValue = value;

    const requestdata = () => {

        APIHandlers.post('api/student/filter/', { query: value }).then(response => {
            if (currentValue === value) {
                const { results } = response;


                const data = results.map((item: any) => ({
                    value: item.id,
                    text: `${item.first_name} ${item.middle_name ?? ''} ${item.last_name} (${item.student_id})`,
                }));
                callback(data);
            }
        }).catch(error => {
            if (error.status == 401) {
                window.location.reload()
            }
        })
    }

    if (value) {
        timeout = setTimeout(requestdata, 300);
    } else {
        callback([]);
    }
};

const StudentSearch = (props: Props) => {


    const [Loading, setLoading] = useState(false)

    const [data, setData] = useState<SelectProps['options']>([])
    // const [value, setValue] = useState<string>();
    const [SelectedStudent, setSelectedStudent] = useState<AddNewStudentForm>()

    const handleSearch = (newValue: string) => {
        setLoading(true)
        fetch(newValue, setData);


    }



    const handleChange = (newValue: string) => {
        props.setValue(newValue);
        if (newValue !== undefined || newValue > 0) {
            APIHandlers.get(`/api/student/student/${newValue}`).then(data => setSelectedStudent(data))
            setLoading(false)

        } else {
            setSelectedStudent(undefined)
            setLoading(false)

        }
    };


    return (
        <>
            <Select
                showSearch
                value={props.value}
                allowClear={props.allowClear ?? true}
                // className='min-w-[25vw]'
                className={props.className}
                placeholder={props.placeholder}
                style={props.style ?? { minWidth: '20vw', maxWidth: '25vw' }}
                defaultActiveFirstOption={false}
                suffixIcon={Loading ? <AiOutlineLoading className='animate-spin' /> : null}
                filterOption={false}
                onSearch={handleSearch}
                onChange={handleChange}
                notFoundContent={props.notFoundContent}
                options={(data || []).map((d) => ({
                    value: d.value,
                    label: d.text,
                }))}
            />
            {
                SelectedStudent !== undefined ?
                    <div>
                        <a className='text-xs text-purple-700  px-2 font-semibold '>
                            Student Id: {SelectedStudent?.student.student_id}
                        </a>
                    </div>

                    : <React.Fragment></React.Fragment>
            }
        </>
    )
}

export default StudentSearch