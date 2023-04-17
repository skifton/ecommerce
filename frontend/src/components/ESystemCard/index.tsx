import React from "react";

interface IProps {
    children: React.ReactNode;
    title: string;
    amount: number | undefined;
    description: string;
};
const ESystemCard: React.FC<IProps> = ({
    children,
    title,
    amount = 0,
    description,
}) => {
  return (
    <div className="grid grid-cols-1 gap-6 ">
      <section aria-labelledby="section-1-title">
        <div className="overflow-hidden rounded-lg bg-gray-400 shadow-lg">
          <div className="p-6">
            <div className="flex justify-between">
                {children}
                <div>
                    <p>{title}</p>
                    <p className="float-right">{amount}</p>
                </div>
            </div>
            <hr className="mt-10 text-gray-800"/>
            <p className="test-xs font-thin text-gray-800 mt-4">*{description}</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ESystemCard;
