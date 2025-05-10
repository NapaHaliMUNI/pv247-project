import { useMutation } from '@tanstack/react-query';
import type { PutBlobResult } from '@vercel/blob';

const postCourseThumbnail = async ({
	courseId,
	file
}: {
	courseId: string;
	file: File;
}) => {
	const formData = new FormData();
	formData.append('courseId', courseId);
	formData.append('file', file);

	const response = await fetch('/api/upload/course-thumbnail', {
		method: 'POST',
		body: formData
	});

	if (!response.ok) {
		throw new Error('Failed to upload course thumbnail');
	}

	return (await response.json()) as PutBlobResult;
};

export const useCreateCourseThumbnailMutation = () =>
	useMutation({
		mutationFn: postCourseThumbnail
	});
