interface HeaderProps {
  title: string;
}

export const Header: React.FC<HeaderProps> = ({ title }): JSX.Element => {
  return (
    <div className="bg-gray-900">
      <div className="pt-12 pb-32 px-4 sm:px-6 lg:px-8 lg:pt-20">
        <div className="text-center">
          <p className="mt-2 text-3xl font-semibold text-white sm:text-4xl lg:text-5xl">
            {title}
          </p>
        </div>
      </div>
    </div>
  );
};
