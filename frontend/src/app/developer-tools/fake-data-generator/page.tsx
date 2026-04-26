"use client";
import { useState } from "react";
import { ToolLayout } from "@/components/shared/ToolLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Copy, Download, RefreshCw } from "lucide-react";
import { toast } from "sonner";

const FIRST_NAMES = ["Aarav","Aditi","Akash","Aakanksha","Amit","Ananya","Arjun","Deepa","Disha","Gaurav","Ishaan","Kavya","Kiran","Lakshmi","Manish","Meera","Mohan","Nadia","Nisha","Priya","Rahul","Raj","Rajesh","Ravi","Rohit","Sakshi","Sanjay","Sara","Shreya","Suresh","Tanvi","Vikram","Vivek","Yash","Zara","Pooja","Neha","Nikhil","Sneha","Varun","Ritika","Kartik","Divya","Anil","Sunita","Bhavesh","Jyoti","Pallavi","Rajan","Swati"];
const LAST_NAMES = ["Sharma","Verma","Gupta","Patel","Singh","Kumar","Mehta","Joshi","Nair","Reddy","Iyer","Pillai","Shah","Malhotra","Chauhan","Yadav","Mishra","Agarwal","Bose","Chandra","Das","Ghosh","Kapoor","Mathur","Pandey","Rao","Saxena","Srivastava","Tiwari","Tripathi"];
const CITIES = ["Mumbai","Delhi","Bengaluru","Hyderabad","Pune","Chennai","Kolkata","Ahmedabad","Jaipur","Surat","Lucknow","Bhopal","Chandigarh","Nagpur","Indore","Coimbatore","Vadodara","Patna","Agra","Nashik"];
const STREETS = ["MG Road","Nehru Nagar","Gandhi Marg","Shivaji Nagar","Lal Bagh","Rajaji Street","Ashok Avenue","Tagore Lane","Bose Colony","Patel Enclave"];
const COMPANIES = ["Infosys","TCS","Wipro","HCL Tech","Tech Mahindra","Cognizant","Reliance","HDFC Bank","ICICI Bank","Bajaj Auto","Flipkart","Zomato","Paytm","Ola","BYJU's","PhonePe","Nykaa","Swiggy","Myntra","MakeMyTrip"];
const DOMAINS = ["gmail.com","yahoo.co.in","outlook.com","hotmail.com","rediffmail.com"];
const STATES = ["Maharashtra","Karnataka","Tamil Nadu","Telangana","Gujarat","Rajasthan","Uttar Pradesh","West Bengal","Madhya Pradesh","Punjab"];

function rand<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)]; }
function randInt(min: number, max: number) { return Math.floor(Math.random() * (max - min + 1)) + min; }

function generateRow(id: number) {
  const first = rand(FIRST_NAMES), last = rand(LAST_NAMES);
  const city = rand(CITIES); const state = rand(STATES);
  const phone = `+91 ${randInt(70000,99999)}${randInt(10000,99999)}`;
  const aadhaar = `${randInt(1000,9999)} ${randInt(1000,9999)} ${randInt(1000,9999)}`;
  const dob = `${randInt(1,28).toString().padStart(2,"0")}/${randInt(1,12).toString().padStart(2,"0")}/${randInt(1975,2003)}`;
  const salary = `₹${randInt(3,45)},${randInt(10,99)}000 LPA`;
  const email = `${first.toLowerCase()}.${last.toLowerCase()}${randInt(1,99)}@${rand(DOMAINS)}`;
  const address = `${randInt(1,999)}, ${rand(STREETS)}, ${city}, ${state} - ${randInt(100000,999999)}`;
  const company = rand(COMPANIES);
  return { id, name: `${first} ${last}`, email, phone, aadhaar, dob, city, state, address, company, salary };
}

type Field = "name"|"email"|"phone"|"aadhaar"|"dob"|"city"|"address"|"company"|"salary";
const ALL_FIELDS: { key: Field; label: string }[] = [
  { key: "name", label: "Full Name" }, { key: "email", label: "Email" }, { key: "phone", label: "Phone" },
  { key: "aadhaar", label: "Aadhaar (format)" }, { key: "dob", label: "Date of Birth" },
  { key: "city", label: "City" }, { key: "address", label: "Address" }, { key: "company", label: "Company" },
  { key: "salary", label: "Salary" },
];

export default function FakeDataPage() {
  const [count, setCount] = useState(10);
  const [fields, setFields] = useState<Set<Field>>(new Set(["name","email","phone","city","address"]));
  const [rows, setRows] = useState<ReturnType<typeof generateRow>[]>([]);

  const generate = () => setRows(Array.from({ length: Math.min(count, 100) }, (_, i) => generateRow(i + 1)));

  const toggleField = (f: Field) => setFields(s => { const n = new Set(s); n.has(f) ? n.delete(f) : n.add(f); return n; });

  const toCSV = () => {
    const activeFields = ALL_FIELDS.filter(f => fields.has(f.key));
    const header = ["ID", ...activeFields.map(f => f.label)].join(",");
    const csvRows = rows.map(r => [r.id, ...activeFields.map(f => `"${(r as any)[f.key]}"`)].join(","));
    const blob = new Blob([[header, ...csvRows].join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob); const a = document.createElement("a"); a.href = url; a.download = "fake-data.csv"; a.click();
  };

  const toJSON = () => {
    const filtered = rows.map(r => {
      const obj: any = { id: r.id };
      fields.forEach(f => { obj[f] = (r as any)[f]; });
      return obj;
    });
    const blob = new Blob([JSON.stringify(filtered, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob); const a = document.createElement("a"); a.href = url; a.download = "fake-data.json"; a.click();
  };

  const copyJSON = () => {
    const filtered = rows.map(r => { const obj: any = { id: r.id }; fields.forEach(f => { obj[f] = (r as any)[f]; }); return obj; });
    navigator.clipboard.writeText(JSON.stringify(filtered, null, 2)).then(() => toast.success("Copied!"));
  };

  const activeFields = ALL_FIELDS.filter(f => fields.has(f.key));

  return (
    <ToolLayout
      title="Fake Data Generator (India)"
      description="Generate realistic Indian fake data: names, emails, phone numbers, addresses, and more. Export as CSV or JSON."
      categoryName="Developer Tools" categoryPath="/developer-tools" slug="fake-data-generator"
      about={<div className="space-y-2"><p>Generate bulk realistic Indian locale fake data for development and testing. All data is randomly generated in the browser — no server calls.</p></div>}
      faq={[
        { question: "Is Aadhaar data real?", answer: "No. The Aadhaar-format IDs are randomly generated numbers following the 12-digit format only. They are not real or valid IDs." },
        { question: "Can I export to CSV?", answer: "Yes! Click the CSV button after generating data to download a file." },
      ]}
    >
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="bg-card border rounded-2xl p-5 space-y-4">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <label className="text-sm font-bold whitespace-nowrap">Rows (max 100):</label>
              <Input type="number" min={1} max={100} value={count} onChange={e => setCount(parseInt(e.target.value)||10)} className="w-24 h-9" />
            </div>
            <Button onClick={generate} className="gap-2 rounded-xl"><RefreshCw className="w-4 h-4" /> Generate</Button>
            {rows.length > 0 && <>
              <Button onClick={toCSV} variant="outline" className="gap-2 rounded-xl"><Download className="w-4 h-4" /> CSV</Button>
              <Button onClick={toJSON} variant="outline" className="gap-2 rounded-xl"><Download className="w-4 h-4" /> JSON</Button>
              <Button onClick={copyJSON} variant="outline" size="icon" className="rounded-xl"><Copy className="w-4 h-4" /></Button>
            </>}
          </div>
          {/* Field toggles */}
          <div>
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Fields to include:</p>
            <div className="flex flex-wrap gap-2">
              {ALL_FIELDS.map(f => (
                <button key={f.key} onClick={() => toggleField(f.key)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all ${fields.has(f.key) ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:border-foreground/30"}`}>
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {rows.length > 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="overflow-x-auto rounded-2xl border bg-card">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left p-3 text-xs font-bold text-muted-foreground uppercase tracking-wider">#</th>
                  {activeFields.map(f => <th key={f.key} className="text-left p-3 text-xs font-bold text-muted-foreground uppercase tracking-wider whitespace-nowrap">{f.label}</th>)}
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={r.id} className={`border-t ${i % 2 === 0 ? "" : "bg-muted/20"}`}>
                    <td className="p-3 text-muted-foreground font-mono text-xs">{r.id}</td>
                    {activeFields.map(f => <td key={f.key} className="p-3 font-mono text-xs whitespace-nowrap max-w-xs truncate">{(r as any)[f.key]}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}
      </div>
    </ToolLayout>
  );
}
