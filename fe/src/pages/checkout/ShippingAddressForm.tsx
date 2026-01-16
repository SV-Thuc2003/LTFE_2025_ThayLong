import React, { useEffect, useState } from 'react';
import type { ShippingAddress } from '../../types/check-out.ts';

interface ShippingAddressFormProps {
    shippingAddress: ShippingAddress;
    onShippingAddressChange: (field: keyof ShippingAddress, value: string) => void;
    onShippingFeeChange: (fee: number) => void;
}

const FAKE_PROVINCES = [
    { ProvinceID: 201, ProvinceName: "Hà Nội" },
    { ProvinceID: 202, ProvinceName: "Hồ Chí Minh" },
    { ProvinceID: 203, ProvinceName: "Đà Nẵng" }
];
const FAKE_DISTRICTS: Record<number, any[]> = {
    201: [{ DistrictID: 1482, DistrictName: "Quận Ba Đình" }, { DistrictID: 1484, DistrictName: "Quận Đống Đa" }],
    202: [{ DistrictID: 1442, DistrictName: "Quận 1" }, { DistrictID: 1444, DistrictName: "Thành phố Thủ Đức" }],
    203: [{ DistrictID: 1530, DistrictName: "Quận Hải Châu" }]
};
const FAKE_WARDS: Record<number, any[]> = {
    1482: [{ WardCode: "1001", WardName: "Phường Phúc Xá" }],
    1484: [{ WardCode: "1002", WardName: "Phường Láng Hạ" }],
    1442: [{ WardCode: "2001", WardName: "Phường Bến Nghé" }],
};

const ShippingAddressForm: React.FC<ShippingAddressFormProps> = ({
                                                                     shippingAddress, onShippingAddressChange, onShippingFeeChange
                                                                 }) => {
    const [districts, setDistricts] = useState<any[]>([]);
    const [wards, setWards] = useState<any[]>([]);

    const [selectedProvinceId, setSelectedProvinceId] = useState<number | null>(null);
    const [selectedDistrictId, setSelectedDistrictId] = useState<number | null>(null);
    const [selectedWardCode, setSelectedWardCode] = useState<string>('');

    // Logic giả lập load Quận/Huyện/Xã
    useEffect(() => {
        if (!selectedProvinceId) { setDistricts([]); return; }
        setDistricts(FAKE_DISTRICTS[selectedProvinceId] || []);
    }, [selectedProvinceId]);

    useEffect(() => {
        if (!selectedDistrictId) { setWards([]); return; }
        setWards(FAKE_WARDS[selectedDistrictId] || [{ WardCode: "9999", WardName: "Phường Mẫu" }]);
    }, [selectedDistrictId]);

    // Update state cha
    useEffect(() => {
        const p = FAKE_PROVINCES.find(x => x.ProvinceID === selectedProvinceId);
        if (p) {
            onShippingAddressChange('provinceId', p.ProvinceID.toString());
            onShippingAddressChange('city', p.ProvinceName);
        }
    }, [selectedProvinceId, onShippingAddressChange]);

    useEffect(() => {
        const d = districts.find(x => x.DistrictID === selectedDistrictId);
        if (d) {
            onShippingAddressChange('districtId', d.DistrictID.toString());
            onShippingAddressChange('district', d.DistrictName);
        }
    }, [selectedDistrictId, districts, onShippingAddressChange]);

    useEffect(() => {
        const w = wards.find(x => x.WardCode === selectedWardCode);
        if (w) {
            onShippingAddressChange('wardCode', w.WardCode);
            onShippingAddressChange('ward', w.WardName);
        }
    }, [selectedWardCode, wards, onShippingAddressChange]);

    // Tính phí ship giả
    useEffect(() => {
        if (shippingAddress.districtId && shippingAddress.wardCode) {
            onShippingFeeChange(30000);
        }
    }, [shippingAddress.districtId, shippingAddress.wardCode, onShippingFeeChange]);

    return (
        <div className="mb-6">
            <div className="p-6 border border-gray-300 rounded-lg space-y-4 bg-white shadow-sm">
                <h2 className="text-2xl font-bold mb-4">Địa chỉ giao hàng</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <select
                        className="p-2 border rounded"
                        onChange={(e) => {
                            setSelectedProvinceId(parseInt(e.target.value));
                            setSelectedDistrictId(null); setSelectedWardCode('');
                        }}
                    >
                        <option value="">-- Chọn Tỉnh/Thành --</option>
                        {FAKE_PROVINCES.map(p => <option key={p.ProvinceID} value={p.ProvinceID}>{p.ProvinceName}</option>)}
                    </select>

                    <select
                        className="p-2 border rounded"
                        onChange={(e) => setSelectedDistrictId(parseInt(e.target.value))}
                        disabled={!selectedProvinceId}
                    >
                        <option value="">-- Chọn Quận/Huyện --</option>
                        {districts.map(d => <option key={d.DistrictID} value={d.DistrictID}>{d.DistrictName}</option>)}
                    </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <select
                        className="p-2 border rounded"
                        onChange={(e) => setSelectedWardCode(e.target.value)}
                        disabled={!selectedDistrictId}
                    >
                        <option value="">-- Chọn Phường/Xã --</option>
                        {wards.map(w => <option key={w.WardCode} value={w.WardCode}>{w.WardName}</option>)}
                    </select>
                    <input
                        type="text"
                        placeholder="Số nhà, tên đường..."
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