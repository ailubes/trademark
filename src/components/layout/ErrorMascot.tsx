type ErrorMascotProps = {
  title?: string;
  subtitle?: string;
};

export function ErrorMascot({
  title = "Ooops!",
  subtitle = "ТМ перевірила все, але сторінка загубилася.",
}: ErrorMascotProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative mb-6 h-40 w-40 animate-bounce rounded-full bg-tectonic-primary shadow-[6px_6px_0px_0px_#0D1B2A]">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl font-bold uppercase text-tectonic-accent">
          TM
        </div>
        <div className="absolute left-10 top-12 h-3 w-3 rounded-full bg-white" />
        <div className="absolute right-10 top-12 h-3 w-3 rounded-full bg-white" />
        <div className="absolute left-1/2 top-16 h-3 w-3 -translate-x-1/2 rounded-full bg-tectonic-accent" />
        <div className="absolute left-1/2 top-20 h-4 w-8 -translate-x-1/2 rounded-full border-2 border-tectonic-accent" />
        <div className="absolute -right-6 -top-6 rounded-full bg-tectonic-accent px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-tectonic-primary shadow-[4px_4px_0px_0px_#0D1B2A] animate-pulse">
          Ooops
        </div>
      </div>
      <h2 className="text-2xl font-semibold text-tectonic-primary">
        {title}
      </h2>
      <p className="mt-2 max-w-xl text-sm text-tectonic-stone-600">
        {subtitle}
      </p>
    </div>
  );
}
