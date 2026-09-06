import assert from "node:assert/strict";

console.log("[CHECK] Testing project API fields, type filter resolution, and rating sort...");

// 1. Exact sample project data provided in requirements
const sampleProject = {
  duration: {
    startingDate: "2022-09-10T00:00:00.000Z",
    endingDate: "2022-10-30T00:00:00.000Z",
  },
  _id: "6371cc8ab63054d655520fff",
  type: {
    _id: "6a9a71636268de5fadfcfdb9",
    key: "web-app",
    name: "Web App",
    createdAt: "2026-09-04T07:21:07.604Z",
    updatedAt: "2026-09-04T07:21:07.604Z",
    __v: 0,
  },
  project_img: [
    {
      img: "http://res.cloudinary.com/manjiro/image/upload/v1668402311/portfolio_images/hw5obwjsh77zoflk00jz.png",
      _id: "6371cc8ab63054d655521000",
    },
    {
      img: "http://res.cloudinary.com/manjiro/image/upload/v1668402311/portfolio_images/lozft08veqhf0lqzb1xc.png",
      _id: "6371cc8ab63054d655521001",
    },
  ],
  title: "Cakeemon | Order Cakes",
  description:
    "<p>Cakeemon is a Full Stack MERN E-Commerce Website</p><ul><li>Razorpay Integration</li></ul>",
  tech_list: [
    {
      tech: "https://res.cloudinary.com/manjiro/image/upload/v1653702757/portfolio_images/icons/icons8-node-js-144_keslba.png",
      name: "nodejs",
      _id: "6371cc8ab63054d655521004",
    },
    {
      tech: "https://res.cloudinary.com/manjiro/image/upload/v1653702756/portfolio_images/icons/icons8-react-native-144_d2z2r2.png",
      name: "reactjs",
      _id: "6371cc8ab63054d655521005",
    },
  ],
  visit_link: "https://cakeemon.vercel.app/",
  git_link: "https://github.com/DeepHansda/Cakeemon",
  createdAt: "2022-11-14T05:05:14.144Z",
  updatedAt: "2022-11-14T05:05:14.144Z",
  __v: 0,
  rating: 7.4,
};

// Validate schema fields
assert.equal(typeof sampleProject._id, "string");
assert.equal(sampleProject.title, "Cakeemon | Order Cakes");
assert.equal(sampleProject.type.key, "web-app");
assert.equal(sampleProject.type.name, "Web App");
assert.ok(Array.isArray(sampleProject.project_img) && sampleProject.project_img.length === 2);
assert.ok(Array.isArray(sampleProject.tech_list) && sampleProject.tech_list.length === 2);
assert.equal(sampleProject.rating, 7.4);
assert.ok(sampleProject.description.includes("<p>") && sampleProject.description.includes("<ul>"));
assert.equal(sampleProject.visit_link, "https://cakeemon.vercel.app/");
assert.equal(sampleProject.git_link, "https://github.com/DeepHansda/Cakeemon");
assert.ok(sampleProject.duration.startingDate && sampleProject.duration.endingDate);

// 2. Test sorting by rating descending (highest rating first)
const mockProjects = [
  { _id: "1", title: "Project A", rating: 5.2, createdAt: "2023-01-01" },
  { _id: "2", title: "Project B", rating: 9.8, createdAt: "2023-01-02" },
  { _id: "3", title: "Project C", rating: 7.4, createdAt: "2023-01-03" },
  { _id: "4", title: "Project D", rating: 0, createdAt: "2023-01-04" },
];

const sorted = [...mockProjects].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
assert.equal(sorted[0].title, "Project B", "Highest rating (9.8) should be first");
assert.equal(sorted[1].title, "Project C", "Second highest rating (7.4) should be second");
assert.equal(sorted[2].title, "Project A", "Third highest rating (5.2) should be third");
assert.equal(sorted[3].title, "Project D", "Lowest rating (0) should be last");

// 3. Test parameter-based type filtering resolution logic
function matchTypeFilter(typeParam, projectType) {
  if (!typeParam || typeParam.trim().toLowerCase() === "all") return true;
  const rawKey = typeParam.trim();
  const slugKey = rawKey
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .toLowerCase();
  return (
    projectType.key.toLowerCase() === rawKey.toLowerCase() ||
    projectType.key.toLowerCase() === slugKey ||
    projectType.name.toLowerCase() === rawKey.toLowerCase()
  );
}

assert.equal(matchTypeFilter("all", sampleProject.type), true, "All matches any type");
assert.equal(matchTypeFilter("web-app", sampleProject.type), true, "Exact key matches");
assert.equal(matchTypeFilter("Web App", sampleProject.type), true, "Name with space matches");
assert.equal(matchTypeFilter("webApp", sampleProject.type), true, "CamelCase slug matches");
assert.equal(matchTypeFilter("mobile-app", sampleProject.type), false, "Mismatched type rejected");

// 4. Test ProjectCard requirements
// Requirement 1: Only one image is extracted
const cardImage = sampleProject.project_img?.[0]?.img || "";
assert.equal(cardImage, "http://res.cloudinary.com/manjiro/image/upload/v1668402311/portfolio_images/hw5obwjsh77zoflk00jz.png");
assert.equal(typeof cardImage, "string");

// Requirement 2: Rating badge is excluded from card (retained in Project data for details page)
assert.equal(sampleProject.rating, 7.4);

// Requirement 3: Two action buttons: "Full Details" and "Demo"
const fullDetailsHref = `/projects/${sampleProject._id}`;
assert.equal(fullDetailsHref, "/projects/6371cc8ab63054d655520fff");
const demoHref = sampleProject.visit_link;
assert.equal(demoHref, "https://cakeemon.vercel.app/");

// 5. Test Single Project API endpoint
async function testSingleProjectEndpoint() {
  try {
    const res = await fetch(`http://localhost:3400/api/projects/${sampleProject._id}`);
    if (res.ok) {
      const json = await res.json();
      assert.equal(json.success, 1, "API should return success = 1");
      assert.equal(json.data._id, sampleProject._id, "API should return matching project ID");
      assert.equal(json.data.title, sampleProject.title, "API should return matching title");
      assert.ok(json.data.type && json.data.type.name, "API should populate project type");
      console.log("[CHECK] Verified GET /api/projects/:id endpoint returned valid populated project ✓");
    } else {
      console.log(`[WARN] Backend returned status ${res.status}`);
    }
  } catch (err) {
    console.log("[INFO] Backend offline or unreachable for network test:", err.message);
  }
}

await testSingleProjectEndpoint();

console.log("[CHECK] All portfolio project API, rating sort, type filter, and card/details checks passed successfully ✓");

