<script lang="ts" module>
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	export type StepState = "done" | "current" | "upcoming";

	export interface StepGroup {
		/** Label shown beneath the segments this group spans. */
		label: string;
		/** Number of consecutive steps the group covers. */
		steps: number;
	}

	export interface StepGroupModel extends StepGroup {
		state: StepState;
	}

	export interface StepProgressModel {
		current: number;
		total: number;
		percent: number;
		segments: StepState[];
		groups: StepGroupModel[];
		valueText: string;
	}

	const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));

	/**
	 * Pure logic for the segmented step bar. Kept separate from rendering so it
	 * is unit-testable in node (mirrors the `buttonVariants` pattern). Inputs are
	 * coerced defensively: `total` floors to at least 1, `current` rounds and
	 * clamps into `[1, total]`.
	 */
	export function stepProgressState(input: {
		current: number;
		total: number;
		groups?: StepGroup[];
	}): StepProgressModel {
		const total = Math.max(1, Math.floor(input.total));
		const current = clamp(Math.round(input.current), 1, total);
		const percent = Math.round((current / total) * 100);

		const segments: StepState[] = Array.from({ length: total }, (_, i) => {
			const step = i + 1;
			if (step < current) return "done";
			if (step === current) return "current";
			return "upcoming";
		});

		// Groups are expected to tile the steps in order (sum(steps) === total).
		// Each group's state is derived from where `current` falls in its range.
		let start = 0; // 0-based index of this group's first step
		const groups: StepGroupModel[] = (input.groups ?? []).map((g) => {
			const span = Math.max(0, Math.floor(g.steps));
			const firstStep = start + 1; // 1-based, inclusive
			const lastStep = start + span; // 1-based, inclusive
			start += span;
			let state: StepState = "upcoming";
			if (current > lastStep) state = "done";
			else if (current >= firstStep) state = "current";
			return { ...g, state };
		});

		return { current, total, percent, segments, groups, valueText: `Step ${current} of ${total}` };
	}

	export type StepProgressProps = WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		/** 1-based index of the active step. */
		current: number;
		/** Total number of steps. */
		total: number;
		/** Optional name of the current step, appended to the caption. */
		label?: string;
		/** Optional phase grouping rendered beneath the bar. */
		groups?: StepGroup[];
		/** Render the "Step N of M" caption (default true). */
		showCaption?: boolean;
	};
</script>

<script lang="ts">
	let {
		class: className,
		current,
		total,
		label = undefined,
		groups = undefined,
		showCaption = true,
		ref = $bindable(null),
		...restProps
	}: StepProgressProps = $props();

	const model = $derived(stepProgressState({ current, total, groups }));
	const valueText = $derived(label ? `${model.valueText} · ${label}` : model.valueText);
</script>

<div
	bind:this={ref}
	data-slot="step-progress"
	role="progressbar"
	aria-valuemin={0}
	aria-valuemax={model.total}
	aria-valuenow={model.current}
	aria-valuetext={valueText}
	class={cn("flex flex-col gap-2", className)}
	{...restProps}
>
	{#if showCaption}
		<p class="text-muted-foreground text-xs">
			{model.valueText}{#if label}<span class="text-foreground"> · {label}</span>{/if}
		</p>
	{/if}

	<div class="flex items-center gap-1" aria-hidden="true">
		{#each model.segments as state, i (i)}
			<span
				class={cn(
					"h-1.5 flex-1 rounded-full transition-colors",
					state === "upcoming" ? "bg-foreground/15" : "bg-foreground",
					state === "current" && "ring-1 ring-foreground/30"
				)}
			></span>
		{/each}
	</div>

	{#if model.groups.length > 0}
		<div class="flex gap-1 text-xs" aria-hidden="true">
			{#each model.groups as g, i (i)}
				<span
					class={cn(
						"min-w-0 truncate",
						g.state === "current" ? "text-foreground font-medium" : "text-muted-foreground"
					)}
					style="flex: {Math.max(1, g.steps)} 1 0;"
				>
					{g.label}
				</span>
			{/each}
		</div>
	{/if}
</div>
