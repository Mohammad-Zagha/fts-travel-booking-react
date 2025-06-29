const Header = ({ title, subtitle }: { title: string; subtitle: string }) => {
  return (
    <div className="text-center mb-12">
      <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
        {title}
      </h1>
      <p className="text-slate-600 text-lg max-w-2xl mx-auto">{subtitle}</p>
    </div>
  );
};

export default Header;
