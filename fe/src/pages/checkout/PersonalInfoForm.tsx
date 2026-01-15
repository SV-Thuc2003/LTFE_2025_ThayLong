import React from 'react';
import type { PersonalInfo } from '../../types/check-out.ts';
import InputField from '../../components/common/InputField';

interface PersonalInfoFormProps {
    personalInfo: PersonalInfo;
    onPersonalInfoChange: (field: keyof PersonalInfo, value: string) => void;
}

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({
                                                               personalInfo,
                                                               onPersonalInfoChange,
                                                           }) => {

    return (
        <div className="mb-6">
            <div className="p-6 border border-gray-300 rounded-lg space-y-4 bg-white shadow-sm">
                <h2 className="text-2xl font-bold mb-4">{('Thông tin người gửi')}</h2>

                <InputField
                    label={('Người nhận')}
                    placeholder={('Nguyen Van A')}
                    value={personalInfo.name}
                    onChange={(e) => onPersonalInfoChange('name', e.target.value)}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField
                        label={('Email')}
                        placeholder={('abc@gmail.com')}
                        type="email"
                        value={personalInfo.email}
                        onChange={(e) => onPersonalInfoChange('email', e.target.value)}
                    />

                    <InputField
                        label={('Số điện thoại')}
                        placeholder={('0987 654 321')}
                        type="tel"
                        value={personalInfo.phone}
                        onChange={(e) => onPersonalInfoChange('phone', e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
};

export default PersonalInfoForm;
