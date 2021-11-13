import React, { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from 'recharts';
import { SupplyApiItem } from 'typings/api';

type Props = {
    supply: SupplyApiItem;
};

export const Widget: React.FC<Props> = ({ supply }) => {
    const { t } = useTranslation('supply');

    const data = [
        { name: t('supply:widget.used'), value: supply.deliveredQuantity - supply.quantity },
        { name: t('supply:widget.rest'), value: supply.quantity },
    ];

    let usedColor = '#00C49F';

    const usedPercentage = (supply.quantity / supply.deliveredQuantity) * 100;

    if (usedPercentage <= 30) {
        usedColor = '#9f081c';
    }
    if (usedPercentage <= 50) {
        usedColor = '#FFBB28';
    }

    const COLORS = ['#0088FE', usedColor];

    return (
        <div style={{ width: '100%', height: 230 }}>
            <ResponsiveContainer>
                <PieChart>
                    <Pie
                        dataKey="value"
                        data={data}
                        startAngle={180}
                        endAngle={0}
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={5}
                        label={({ cx, cy, midAngle, innerRadius, outerRadius, value, _percent, _index }): ReactNode => {
                            const RADIAN = Math.PI / 180;
                            const radius = 25 + innerRadius + (outerRadius - innerRadius);
                            const x = cx + radius * Math.cos(-midAngle * RADIAN);
                            const y = cy + radius * Math.sin(-midAngle * RADIAN);

                            return (
                                <text
                                    x={x}
                                    y={y}
                                    fill="white"
                                    textAnchor={x > cx ? 'start' : 'end'}
                                    dominantBaseline="central"
                                >
                                    {`${t('supply:widget.bag', { count: value })}`}
                                </text>
                            );
                        }}
                        activeIndex={1}
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Legend verticalAlign="bottom" height={10} />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};
