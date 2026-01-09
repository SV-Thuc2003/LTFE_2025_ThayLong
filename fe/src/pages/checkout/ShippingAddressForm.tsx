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

const ShippingAddressForm: React.FC<ShippingAddressFormProps> = ({
                                                                     shippingAddress,
                                                                     onShippingAddressChange,
                                                                     onShippingFeeChange,
                                                                 }) => {

    // 2. Thêm Generic Type vào useState để sửa lỗi "type never"
    const [provinces, setProvinces] = useState<GHNProvince[]>([]);
    const [districts, setDistricts] = useState<GHNDistrict[]>([]);
    const [wards, setWards] = useState<GHNWard[]>([]);

    const [selectedProvinceId, setSelectedProvinceId] = useState<number | null>(null);
    const [selectedDistrictId, setSelectedDistrictId] = useState<number | null>(null);
    const [selectedWardCode, setSelectedWardCode] = useState<string>('');

    // Load Provinces
    useEffect(() => {
        axios.post('https://online-gateway.ghn.vn/shiip/public-api/master-data/province', {}, {
            headers: { Token: GHN_TOKEN },
        }).then((res) => setProvinces(res.data.data));
    }, []);

    // Load Districts khi Province thay đổi
    useEffect(() => {
        if (!selectedProvinceId) return;
        axios.post('https://online-gateway.ghn.vn/shiip/public-api/master-data/district', {
            province_id: selectedProvinceId,
        }, {
            headers: { Token: GHN_TOKEN },
        }).then((res) => setDistricts(res.data.data));
    }, [selectedProvinceId]);

    // Load Wards khi District thay đổi
    useEffect(() => {
        if (!selectedDistrictId) return;
        axios.post('https://online-gateway.ghn.vn/shiip/public-api/master-data/ward', {
            district_id: selectedDistrictId,
        }, {
            headers: { Token: GHN_TOKEN },
        }).then((res) => setWards(res.data.data));
    }, [selectedDistrictId]);

    // Cập nhật state cha khi Province chọn thay đổi
    // 3. Fix ESLint: Thêm provinces và onShippingAddressChange vào dependency array
    useEffect(() => {
        if (selectedProvinceId !== null) {
            const selected = provinces.find(p => p.ProvinceID === selectedProvinceId);
            if (selected) {
                onShippingAddressChange('city', selected.ProvinceName);
                onShippingAddressChange('provinceId', selected.ProvinceID.toString());
            }
        }
    }, [selectedProvinceId, provinces, onShippingAddressChange]);

    // Cập nhật state cha khi District chọn thay đổi
    // 3. Fix ESLint: Thêm districts và onShippingAddressChange vào dependency array
    useEffect(() => {
        if (selectedDistrictId !== null) {
            const selected = districts.find(d => d.DistrictID === selectedDistrictId);
            if (selected) {
                onShippingAddressChange('district', selected.DistrictName);
                onShippingAddressChange('districtId', selected.DistrictID.toString());
            }
        }
    }, [selectedDistrictId, districts, onShippingAddressChange]);

    // Cập nhật state cha khi Ward chọn thay đổi
    // 3. Fix ESLint: Thêm wards và onShippingAddressChange vào dependency array
    useEffect(() => {
        if (selectedWardCode) {
            const ward = wards.find(w => w.WardCode === selectedWardCode);
            if (ward) {
                onShippingAddressChange('ward', ward.WardName);
                onShippingAddressChange('wardCode', ward.WardCode);
            }
        }
    }, [selectedWardCode, wards, onShippingAddressChange]);

    // Tính phí ship
    // 3. Fix ESLint: Thêm shippingAddress và onShippingFeeChange
    useEffect(() => {
        if (shippingAddress.districtId && shippingAddress.wardCode) {
            // Lưu ý: Đảm bảo shippingAddress object ổn định hoặc chỉ pass các field cần thiết
            axios.post('/api/shipping/fee', shippingAddress)
                .then(res => onShippingFeeChange(res.data.total))
                .catch(err => {
                    console.error("❌ GHN API lỗi:", err);
                    onShippingFeeChange(0);
                });
        }
    }, [
        shippingAddress.districtId,
        shippingAddress.wardCode,
        // Thêm shippingAddress vào dependency vì nó được dùng trong body axios.post
        shippingAddress,
        onShippingFeeChange
    ]);

    return (
        <div className="mb-6">
            <div className="p-6 border border-gray-300 rounded-lg space-y-4 bg-white shadow-sm">
                {/* Sửa lại hàm t() thay vì ('key') */}
                <h2 className="text-2xl font-bold mb-4">{('shipping.title')}</h2>

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
                        <option value="">{('shipping.selectProvince')}</option>
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
                        <option value="">{('shipping.selectDistrict')}</option>
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
                        <option value="">{('shipping.selectWard')}</option>
                        {wards.map((ward) => (
                            <option key={ward.WardCode} value={ward.WardCode}>
                                {ward.WardName}
                            </option>
                        ))}
                    </select>

                    <input
                        type="text"
                        placeholder={('shipping.addressPlaceholder')}
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