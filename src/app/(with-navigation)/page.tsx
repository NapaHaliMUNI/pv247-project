import { getTest } from '@/server/test';

const Home = async () => {
	const test = await getTest();
	return (
		<div>
			<div>this is courses page</div>
			<div>{test?.name}</div>
		</div>
	);
};

export default Home;
