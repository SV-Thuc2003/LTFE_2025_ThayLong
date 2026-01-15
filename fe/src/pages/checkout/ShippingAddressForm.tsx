import React, { useEffect, useState } from 'react';
import axios from 'axios';
import type { ShippingAddress } from '../../types/check-out.ts';

interface ShippingAddressFormProps {
    shippingAddress: ShippingAddress;
    onShippingAddressChange: (field: keyof ShippingAddress, value: string) => void;
    onShippingFeeChange: (fee: number) => void;
}

interface GHNProvince {
    ProvinceID: number;
    ProvinceName: string;
}

interface GHNDistrict {
    DistrictID: number;
    DistrictName: string;
}

interface GHNWard {
    WardCode: string;
    WardName: string;
}

const GHN_TOKEN = '68b20e88-40bb-11f0-a826-7e1a8402b405';
const GHN_API_BASE = 'https://online-gateway.ghn.vn/shiip/public-api/master-data';

const ShippingAddressForm: React.FC<ShippingAddressFormProps> = ({
                                                                     shippingAddress,
                                                                     onShippingAddressChange,
                                                                     onShippingFeeChange,
                                                                 }) => {

    const [provinces, setProvinces] = useState<GHNProvince[]>([]);
    const [districts, setDistricts] = useState<GHNDistrict[]>([]);
    const [wards, setWards] = useState<GHNWard[]>([]);

    const [selectedProvinceId, setSelectedProvinceId] = useState<number | null>(null);
    const [selectedDistrictId, setSelectedDistrictId] = useState<number | null>(null);
    const [selectedWardCode, setSelectedWardCode] = useState<string>('');

    useEffect(() => {
        axios.post(`${GHN_API_BASE}/province`, {}, {
            headers: { Token: GHN_TOKEN },
        })
            .then((res) => setProvinces(res.data.data))
            .catch((err) => {
                console.error("⚠️ Lỗi tải Tỉnh/Thành (GHN):", err);
            });
    }, []);

    useEffect(() => {
        if (!selectedProvinceId) return;
        axios.post(`${GHN_API_BASE}/district`, {
            province_id: selectedProvinceId,
        }, {
            headers: { Token: GHN_TOKEN },
        })
            .then((res) => setDistricts(res.data.data))
            .catch((err) => console.error("⚠️ Lỗi tải Quận/Huyện:", err));
    }, [selectedProvinceId]);

    useEffect(() => {
        if (!selectedDistrictId) return;
        axios.post(`${GHN_API_BASE}/ward`, {
            district_id: selectedDistrictId,
        }, {
            headers: { Token: GHN_TOKEN },
        })
            .then((res) => setWards(res.data.data))
            .catch((err) => console.error("⚠️ Lỗi tải Phường/Xã:", err));
    }, [selectedDistrictId]);

    useEffect(() => {
        if (selectedProvinceId !== null) {
            const selected = provinces.find(p => p.ProvinceID === selectedProvinceId);
            if (selected) {
                onShippingAddressChange('city', selected.ProvinceName);
                onShippingAddressChange('provinceId', selected.ProvinceID.toString());
            }
        }
    }, [selectedProvinceId, provinces, onShippingAddressChange]);

    useEffect(() => {
        if (selectedDistrictId !== null) {
            const selected = districts.find(d => d.DistrictID === selectedDistrictId);
            if (selected) {
                onShippingAddressChange('district', selected.DistrictName);
                onShippingAddressChange('districtId', selected.DistrictID.toString());
            }
        }
    }, [selectedDistrictId, districts, onShippingAddressChange]);

    useEffect(() => {
        if (selectedWardCode) {
            const ward = wards.find(w => w.WardCode === selectedWardCode);
            if (ward) {
                onShippingAddressChange('ward', ward.WardName);
                onShippingAddressChange('wardCode', ward.WardCode);
            }
        }
    }, [selectedWardCode, wards, onShippingAddressChange]);

    useEffect(() => {
        if (shippingAddress.districtId && shippingAddress.wardCode) {
            const payload = {
                districtId: parseInt(shippingAddress.districtId),
                wardCode: shippingAddress.wardCode
            };

            axios.post('/api/shipping/fee', payload)
                .then(res => onShippingFeeChange(res.data.total))
                .catch(err => {
                    console.error("❌ Lỗi tính phí ship:", err);
                    onShippingFeeChange(0);
                });
        }
    }, [
        shippingAddress.districtId,
        shippingAddress.wardCode,
        onShippingFeeChange
    ]);

    return (
        <div className="mb-6">
            <div className="p-6 border border-gray-300 rounded-lg space-y-4 bg-white shadow-sm">
                <h2 className="text-2xl font-bold mb-4">{('Địa chỉ')}</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <select
                        className="p-2 border rounded"
                        value={selectedProvinceId ?? ''}
                        onChange={(e) => {
                            const id = parseInt(e.target.value);
                            setSelectedProvinceId(id);
                            setDistricts([]);
                            setWards([]);
                            setSelectedDistrictId(null);
                            setSelectedWardCode('');
                        }}
                    >
                        <option value="">{('Tỉnh')}</option>
                        {provinces.map((province) => (
                            <option key={province.ProvinceID} value={province.ProvinceID}>
                                {province.ProvinceName}
                            </option>
                        ))}
                    </select>

                    <select
                        className="p-2 border rounded"
                        value={selectedDistrictId ?? ''}
                        onChange={(e) => setSelectedDistrictId(parseInt(e.target.value))}
                        disabled={!selectedProvinceId}
                    >
                        <option value="">{('Quận/huyện')}</option>
                        {districts.map((district) => (
                            <option key={district.DistrictID} value={district.DistrictID}>
                                {district.DistrictName}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <select
                        className="p-2 border rounded"
                        value={selectedWardCode}
                        onChange={(e) => setSelectedWardCode(e.target.value)}
                        disabled={wards.length === 0}
                    >
                        <option value="">{('Phường')}</option>
                        {wards.map((ward) => (
                            <option key={ward.WardCode} value={ward.WardCode}>
                                {ward.WardName}
                            </option>
                        ))}
                    </select>

                    <input
                        type="text"
                        placeholder={('Số nhà, số đường')}
                        className="p-2 border rounded"
                        value={shippingAddress.address}
                        onChange={(e) => onShippingAddressChange('address', e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
};

export default ShippingAddressForm;