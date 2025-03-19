import { useEffect, useState } from "react";
import axios from "axios";
import { Trie } from "../utils/trie";

const trie = new Trie();

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<string[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        res.data.forEach((user: any) => {
          trie.insert(user.name);
        });
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    if (query) {
      const matches = trie.search(query);
      setResults(matches);
    } else {
      setResults([]);
    }
  }, [query]);

  const services = [
    { title: "Service 1", description: "Description for service 1" },
    { title: "Service 2", description: "Description for service 2" },
    { title: "Service 3", description: "Description for service 3" },
  ];

  const pricingData = [
    { plan: "Basic", price: "$19/month", features: ["Feature A", "Feature B"] },
    {
      plan: "Pro",
      price: "$49/month",
      features: ["Feature A", "Feature B", "Feature C"],
    },
    {
      plan: "Premium",
      price: "$99/month",
      features: ["All features included"],
    },
  ];

  return (
    <div className="relative w-full overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full -z-10">
        <video autoPlay loop muted className="w-full h-full object-cover">
          <source src="/background1.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Hero Content */}
      <div className="relative flex flex-col items-center justify-center text-white px-4 py-24">
        <h1 className="text-4xl md:text-5xl font-bold text-center">
          Welcome to Our Platform
        </h1>
        <p className="mt-4 text-lg md:text-xl text-center">
          We provide amazing services just for you!
        </p>

        {/* ✅ Services Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
          {services.map((service, index) => (
            <div
              key={index}
              className="p-6 bg-white text-black shadow-lg rounded-xl hover:shadow-2xl transition duration-300"
            >
              <h2 className="text-2xl font-semibold">{service.title}</h2>
              <p className="mt-2 text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>

        {/* ✅ Pricing Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
          {pricingData.map((item, index) => (
            <div
              key={index}
              className="p-6 bg-white text-black border rounded-xl shadow-lg hover:shadow-2xl transition duration-300"
            >
              <h2 className="text-xl font-semibold">{item.plan}</h2>
              <p className="text-lg font-medium">{item.price}</p>
              <ul className="mt-4">
                {item.features.map((feature, i) => (
                  <li key={i} className="text-gray-600">
                    ✔ {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ✅ Search Section */}
        <div className="relative w-full max-w-lg mx-auto mt-12">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search users..."
            className="border w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {/* Display Search Results */}
          {results.length > 0 && (
            <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-2 max-h-40 overflow-y-auto shadow-md">
              {results.map((result, index) => (
                <li
                  key={index}
                  className="p-3 cursor-pointer text-black hover:bg-gray-100"
                  onClick={() => setQuery(result)}
                >
                  {result}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* ✅ Contact Form */}
      <div className="py-16 bg-gray-100">
        <div className="max-w-4xl mx-auto">
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Name"
              className="border w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="email"
              placeholder="Email"
              className="border w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <textarea
              placeholder="Message"
              className="border w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 md:col-span-2"
              rows={4}
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-3 rounded-lg w-full hover:bg-blue-600 transition duration-300 md:col-span-2"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
