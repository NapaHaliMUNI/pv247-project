'use client';

import type React from 'react';
import { useState, useRef } from 'react';
import Image from 'next/image';
import { Upload, X, Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';

type ImageUploadProps = {
	onImageUploaded: (imageUrl: string) => void;
	className?: string;
};

export const ImageUpload = ({
	onImageUploaded,
	className
}: ImageUploadProps) => {
	const [image, setImage] = useState<string>(
		'https://placehold.co/400x600.png?text=Course+Image'
	);
	const [isUploading, setIsUploading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		// Reset error state
		setError(null);

		// Check file type
		if (!file.type.startsWith('image/')) {
			setError('Please select an image file');
			return;
		}

		// Check file size (limit to 5MB)
		if (file.size > 5 * 1024 * 1024) {
			setError('Image size must be less than 5MB');
			return;
		}

		try {
			setIsUploading(true);

			// Create form data
			const formData = new FormData();
			formData.append('file', file);

			// Upload to server
			const response = await fetch('/api/upload', {
				method: 'POST',
				body: formData
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.error ?? 'Failed to upload image');
			}

			const data = await response.json();
			setImage(data.url);
			onImageUploaded(data.url);
		} catch (err) {
			console.error('Error uploading image:', err);
			setError(err instanceof Error ? err.message : 'Failed to upload image');
		} finally {
			setIsUploading(false);
		}
	};

	const handleRemoveImage = () => {
		setImage('');
		onImageUploaded('');
		if (fileInputRef.current) {
			fileInputRef.current.value = '';
		}
	};

	return (
		<div className={className}>
			<input
				type="file"
				accept="image/*"
				onChange={handleFileChange}
				className="hidden"
				ref={fileInputRef}
				disabled={isUploading}
			/>

			{!image ? (
				<div
					className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-[#333333] p-6 transition-colors hover:border-[#FF5500]/50"
					onClick={() => fileInputRef.current?.click()}
					onKeyDown={e => {
						if (e.key === 'Enter' || e.key === ' ') {
							e.preventDefault();
							fileInputRef.current?.click();
						}
					}}
					role="button"
					tabIndex={0}
					aria-label="Upload course thumbnail"
				>
					{isUploading ? (
						<>
							<Loader2 className="mb-2 h-10 w-10 animate-spin text-[#FF5500]" />
							<p className="text-sm text-[#ABABAB]">Uploading image...</p>
						</>
					) : (
						<>
							<Upload className="mb-2 h-10 w-10 text-[#ABABAB]" />
							<p className="mb-1 font-medium text-white">
								Upload Course Thumbnail
							</p>
							<p className="text-center text-sm text-[#ABABAB]">
								Drag and drop an image or click to browse
								<br />
								(Max size: 5MB)
							</p>
						</>
					)}
				</div>
			) : (
				<div className="relative overflow-hidden rounded-lg">
					<div className="relative aspect-video">
						<Image
							src={image || '/placeholder.svg'}
							alt="Course thumbnail"
							fill
							className="object-cover"
						/>
					</div>
					<div className="absolute top-2 right-2 flex gap-2">
						<Button
							variant="outline"
							size="icon"
							className="h-8 w-8 border-[#333333] bg-[#1A1A1A]/80 text-white hover:bg-[#1A1A1A]"
							onClick={() => fileInputRef.current?.click()}
							disabled={isUploading}
						>
							<Upload className="h-4 w-4" />
						</Button>
						<Button
							variant="outline"
							size="icon"
							className="h-8 w-8 border-[#333333] bg-[#1A1A1A]/80 text-white hover:bg-[#1A1A1A]"
							onClick={handleRemoveImage}
							disabled={isUploading}
						>
							<X className="h-4 w-4" />
						</Button>
					</div>
				</div>
			)}

			{error && <p className="mt-2 text-sm text-red-500">{error}</p>}
		</div>
	);
};
