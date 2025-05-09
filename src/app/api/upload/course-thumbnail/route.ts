'use server';
import { put, BlobAccessError } from '@vercel/blob';
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

export const POST = async (request: Request): Promise<NextResponse> => {
	try {
		const formData = await request.formData();
		const courseId = formData.get('courseId') as string;
		const file = formData.get('file') as File;

		if (!file) {
			return NextResponse.json({ error: 'No file provided' }, { status: 400 });
		}

		// Check file type
		if (!file.type.startsWith('image/')) {
			return NextResponse.json(
				{ error: 'File must be an image' },
				{ status: 415 }
			);
		}

		// Check file size (limit to 4.5MB)
		if (file.size > 4.5 * 1024 * 1024) {
			return NextResponse.json(
				{ error: 'File size must be less than 4.5MB' },
				{ status: 413 }
			);
		}

		// Generate a unique filename
		const filename = `courses/${courseId}/thumbnails/${uuidv4()}`;

		// Upload to Vercel Blob
		const blob = await put(filename, file, {
			access: 'public'
		});

		return NextResponse.json(blob);
	} catch (error) {
		console.error('Error uploading file:', error);
		if (error instanceof BlobAccessError) {
			return NextResponse.json(
				{ error: 'Failed to upload file' },
				{ status: 500 }
			);
		} else {
			return NextResponse.json(
				{ error: 'An unexpected error occurred' },
				{ status: 500 }
			);
		}
	}
};
