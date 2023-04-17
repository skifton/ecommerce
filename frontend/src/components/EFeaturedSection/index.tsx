import React from "react";
import { Link } from "react-router-dom";

interface IProps {
    linkTo: any,
    title: string,
    description: string,
    image: string,
}
const EFeaturedSection: React.FC<IProps> = ({
    linkTo,
    title,
    description,
    image
}) => {
  return (
    <section
      aria-labelledby="social-impact-heading"
      className="mx-auto max-w-7xl px-4 pt-24 sm:px-6 sm:pt-32 lg:px-8"
    >
      <div className="relative overflow-hidden rounded-lg">
        <div className="absolute inset-0">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div className="relative bg-gray-500/40 py-32 px-6 sm:py-40 sm:px-12 lg:px-16">
          <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
            <h2
              id="social-impact-heading"
              className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
            >
              {title}
            </h2>
            <p className="mt-3 text-xl text-white">
              {description}
            </p>
            <Link
              to={linkTo}
              className="mt-8 block w-full rounded-md border border-transparent bg-white py-3 px-8 text-base font-medium text-gray-900 hover:bg-gray-100 sm:w-auto"
            >
              Shop {title}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EFeaturedSection;
