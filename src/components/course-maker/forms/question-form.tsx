'use client';

import type React from 'react';
import { useEffect } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';

import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select';
import { useCourseMakerContext } from '@/store/course-maker/course-maker-context';
import { getToolbarTemplate } from '@/utils/quillToolbarTemplate';

export const QuestionForm = () => {
	const {
		courseLessons,
		courseLessonQuestions,
		currentQuestion,
		setCurrentQuestion,
		editingQuestionId,
		setEditingQuestionId,
		handleOptionChange,
		handleQuestionTypeChange,
		handleQuestionChange,
		handleCorrectOptionChange,
		addOption,
		removeOption,
		addQuestion
	} = useCourseMakerContext();

	const { quill, quillRef } = useQuill({
		modules: {
			toolbar: getToolbarTemplate()
		}
	});

	useEffect(() => {
		if (quill) {
			quill.clipboard.dangerouslyPasteHTML(
				currentQuestion.explanationHtml ?? ''
			);
		}
	}, [quill, editingQuestionId]);

	useEffect(() => {
		if (quill) {
			quill.on('text-change', () => {
				setCurrentQuestion(prev => ({
					...prev,
					explanationHtml: quill.root.innerHTML
				}));
			});
		}
	}, [quill, setCurrentQuestion]);

	return (
		<Card className="border-[#2A2A2A] bg-[#1A1A1A] text-white">
			<CardHeader>
				<CardTitle>
					{editingQuestionId ? 'Edit Question' : 'Add New Question'}
				</CardTitle>
				<CardDescription className="text-[#ABABAB]">
					Create assessment questions to test knowledge
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-6">
				{/* Lesson Selection */}
				<div className="space-y-2">
					<Label htmlFor="lessonSelect">Select Lesson</Label>
					<Select
						value={currentQuestion?.lessonId?.toString()}
						onValueChange={value =>
							setCurrentQuestion(current => {
								if (!current) {
									return {
										id: uuidv4(),
										title: '',
										lessonId: value,
										type: 'radio',
										options: [],
										explanationHtml: '',
										questionOrder: courseLessonQuestions.length
									};
								}
								return { ...current, lessonId: value };
							})
						}
					>
						<SelectTrigger className="border-[#333333] bg-[#151515] text-white">
							<SelectValue placeholder="Choose a lesson" />
						</SelectTrigger>
						<SelectContent className="border-[#333333] bg-[#151515] text-white">
							{courseLessons.map(lesson => (
								<SelectItem key={lesson.id} value={lesson.id.toString()}>
									{lesson.title}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>

				<div className="space-y-2">
					<Label htmlFor="questionTitle">Question</Label>
					<Input
						id="questionTitle"
						name="title"
						placeholder="e.g. What is the correct spray pattern for AK-47?"
						className="border-[#333333] bg-[#151515] text-white focus-visible:ring-[#FF5500]"
						value={currentQuestion?.title}
						onChange={handleQuestionChange}
					/>
				</div>

				<div className="space-y-2">
					<Label>Question Type</Label>
					<div className="flex flex-wrap gap-3">
						<Button
							type="button"
							variant={
								currentQuestion?.type === 'radio' ? 'default' : 'outline'
							}
							className={
								currentQuestion?.type === 'radio'
									? 'bg-[#FF5500] text-white hover:bg-[#FF5500]/90'
									: 'border-[#333333] bg-transparent text-white hover:bg-[#1F1F1F]'
							}
							onClick={() => handleQuestionTypeChange('radio')}
						>
							Radio Selection
						</Button>
						<Button
							type="button"
							variant={
								currentQuestion?.type === 'checkbox' ? 'default' : 'outline'
							}
							className={
								currentQuestion?.type === 'checkbox'
									? 'bg-[#FF5500] text-white hover:bg-[#FF5500]/90'
									: 'border-[#333333] bg-transparent text-white hover:bg-[#1F1F1F]'
							}
							onClick={() => handleQuestionTypeChange('checkbox')}
						>
							Checkbox Selection
						</Button>
						<Button
							type="button"
							variant={
								currentQuestion?.type === 'true-false' ? 'default' : 'outline'
							}
							className={
								currentQuestion?.type === 'true-false'
									? 'bg-[#FF5500] text-white hover:bg-[#FF5500]/90'
									: 'border-[#333333] bg-transparent text-white hover:bg-[#1F1F1F]'
							}
							onClick={() => handleQuestionTypeChange('true-false')}
						>
							True/False
						</Button>
					</div>
				</div>

				<div className="space-y-4">
					<div className="flex items-center justify-between">
						<Label>Answer Options</Label>
						{currentQuestion?.type !== 'true-false' && (
							<Button
								type="button"
								variant="outline"
								size="sm"
								className="border-[#333333] bg-transparent text-white hover:bg-[#1F1F1F]"
								onClick={addOption}
							>
								<Plus className="mr-1 h-3 w-3" />
								Add Option
							</Button>
						)}
					</div>

					<div className="space-y-3">
						{currentQuestion?.options.map((option, index) => (
							<div key={option.id} className="flex items-center gap-3">
								{currentQuestion.type === 'radio' ||
								currentQuestion.type === 'true-false' ? (
									<RadioGroup
										value={
											currentQuestion.options
												.find(o => o.isCorrect)
												?.id.toString() ?? ''
										}
									>
										<div className="flex items-center space-x-2">
											<RadioGroupItem
												value={option.id.toString()}
												id={`option-${option.id}`}
												onClick={() => handleCorrectOptionChange(option.id)}
											/>
										</div>
									</RadioGroup>
								) : (
									<Checkbox
										id={`option-${option.id}`}
										checked={option.isCorrect}
										onCheckedChange={() => handleCorrectOptionChange(option.id)}
									/>
								)}

								<div className="flex-grow">
									<Input
										placeholder={`Option ${index + 1}`}
										className="border-[#333333] bg-[#151515] text-white focus-visible:ring-[#FF5500]"
										value={option.text}
										onChange={e =>
											handleOptionChange(option.id, e.target.value)
										}
										readOnly={currentQuestion.type === 'true-false'}
									/>
								</div>

								{currentQuestion.type !== 'true-false' &&
									currentQuestion.options.length > 2 && (
										<Button
											type="button"
											variant="ghost"
											size="icon"
											className="h-8 w-8 text-[#ABABAB] hover:bg-[#1F1F1F] hover:text-white"
											onClick={() => removeOption(option.id)}
										>
											<Trash2 className="h-4 w-4" />
										</Button>
									)}
							</div>
						))}
					</div>
				</div>

				<div className="space-y-2">
					<Label htmlFor="explanationHtml">Explanation (Optional)</Label>
					<div className="ql-html-container bg-[#151515] text-white">
						<div id="explanationHtml" ref={quillRef} />
					</div>
				</div>

				<div className="flex justify-end">
					{editingQuestionId ? (
						<>
							<Button
								variant="outline"
								className="mr-2 border-[#333333] bg-transparent text-white hover:bg-[#1F1F1F]"
								onClick={() => {
									setCurrentQuestion({
										id: uuidv4(),
										title: '',
										lessonId: null,
										type: 'radio',
										options: [],
										explanationHtml: '',
										questionOrder: courseLessonQuestions.length
									});
									setEditingQuestionId(null);
								}}
							>
								Cancel
							</Button>
							<Button
								className="bg-[#FF5500] text-white hover:bg-[#FF5500]/90"
								onClick={addQuestion}
								disabled={
									!currentQuestion?.title ||
									!currentQuestion.lessonId ||
									currentQuestion.options.some(opt => !opt.text) ||
									!currentQuestion.options.some(opt => opt.isCorrect)
								}
							>
								Update Question
							</Button>
						</>
					) : (
						<Button
							className="bg-[#FF5500] text-white hover:bg-[#FF5500]/90"
							onClick={() => {
								addQuestion();
								quill?.setText('');
							}}
							disabled={
								!currentQuestion?.title ||
								!currentQuestion.lessonId ||
								currentQuestion.options.some(opt => !opt.text) ||
								!currentQuestion.options.some(opt => opt.isCorrect)
							}
						>
							<Plus className="mr-2 h-4 w-4" />
							Add Question
						</Button>
					)}
				</div>
			</CardContent>
		</Card>
	);
};
